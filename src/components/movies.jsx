import React from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import paginate from "../utils/paginate";
import SearchBox from "./searchBox";
import _ from "lodash";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./common/logout.css";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: { _id: "", name: "All Genres" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const movies = (await getMovies()).data;
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async ({ _id: id }) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== id);
    this.setState({ movies });
    try {
      return await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("The Movie Has Been Deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = ({ _id: id }) => {
    let movie = this.state.movies.filter((m) => m._id === id);
    movie[0].liked = !movie[0].liked;
    this.setState(movie);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    const { totalCount, movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {
            <>
              {user && (
                <Link className="btn btn-primary" to={"/movies/new"}>
                  New Movie <i className="fa fa-plus-circle"></i>
                </Link>
              )}
              <br />
              <br />
              <p>Showing {totalCount} movies in the Database</p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <hr />
              <MoviesTable
                movies={movies}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </>
          }
        </div>
      </div>
    );
  }
}

export default Movies;
