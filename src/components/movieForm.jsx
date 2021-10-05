import Joi from "joi-browser";
import _ from "lodash";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { getMovie, getMovies, saveMovie } from "../services/movieService";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
    movie: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  populateGenres = async () => {
    const genres = (await getGenres()).data;
    this.setState({ genres });
  };
  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Invalid Movie");
        return this.props.history.replace("/not-found");
      }
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data)
      .then((res) => {
        this.props.history.push("/movies");
      })
      .catch((err) => {
        this.props.history.push("/movies");
        toast.error("You Need to be Logged In To Edit A Movie");
        console.log("err", err);
      });
  };
  render() {
    return (
      <div>
        <h3>
          Movie Form
          <em> {this.state.data.title}</em>
        </h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save ")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
