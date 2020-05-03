import React from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "../../config";
import "./Home.css";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";

class Home extends React.Component {
  // const [movies, setMovies] = useState([]);
  // const [heroImage, setHeroImage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  // const [searchTerm, setSearchTerm] = useState("");

  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: "",
  };

  componentDidMount() {
    const tmp = localStorage.getItem("HomeState");
    if (tmp) {
      const state = JSON.parse(tmp);
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = searchTerm => {
    console.log(searchTerm);
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm,
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        let heroTmp =
          this.state.searchTerm === ""
            ? this.state.heroImage || result.results[0]
            : result.results[0];
        this.setState(
          {
            movies: [...this.state.movies, ...result.results],
            heroImage: heroTmp,
            // heroImage: this.state.heroImage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
          },
          () => {
            if (this.state.searchTerm === "")
              localStorage.setItem("HomeState", JSON.stringify(this.state));
          }
        );
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    const {
      movies,
      heroImage,
      searchTerm,
      loading,
      currentPage,
      totalPages,
    } = this.state;

    return (
      <div className="rmdb-home">
        {heroImage ? (
          <div>
            <HeroImage
              title={heroImage.original_title}
              text={heroImage.overview}
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            />
            <SearchBar searchItems={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? "Search Results" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((elem, i) => {
              // console.log(elem);
              return (
                <MovieThumb
                  key={i}
                  clickable
                  image={
                    elem.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${elem.poster_path}`
                      : "images/no_image.jpg"
                  }
                  movieId={elem.id}
                  movieName={elem.original_title}
                />
              );
            })}
          </FourColGrid>
          {loading && <Spinner />}
          {currentPage <= totalPages && !loading && (
            <LoadMoreBtn text="Load More" loadMoreItems={this.loadMoreItems} />
          )}
        </div>

        {/* <Spinner />
        <LoadMoreBtn text={} loadMoreItems={loadMoreItems} /> */}
      </div>
    );
  }
}

export default Home;
