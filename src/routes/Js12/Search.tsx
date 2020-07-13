import axios from "axios";

export default class Search {
  constructor(readonly query: string) {}
  result: [] = [];
  async getResults() {
    try {
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
