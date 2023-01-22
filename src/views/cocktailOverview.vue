<template>
  <div class="bg-header">
    <div class="container ca-gutter">
      <div class="header">
        <h1 class="header-bigtext">Ready. Set. <span>Drink.</span></h1>
        <h3>Cocktails that will make you thristy</h3>
        <input
          type="search"
          v-model="search"
          class="search-icon"
          placeholder="Search for your favorite..."
        />
      </div>
    </div>
  </div>
  <div class="container ca-gutter">
    <div v-if="drinks" class="row">
      <div
        class="cocktail-list__card"
        v-for="drink in filteredDrinks"
        :key="drink.idDrink"
      >
        <router-link
          :to="{
            name: 'cocktailDetail',
            query: { idDrink: drink.idDrink },
          }"
        >
          <div class="cocktail-list__image">
            <img :src="drink.strDrinkThumb" alt="Image of cocktail" />
          </div>
          <div class="cocktail-list__header">
            <p>{{ drink.strDrink }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cocktailOverview",
  data() {
    return {
      drinks: null,
      search: "",
    };
  },
  computed: {
    filteredDrinks() {
      if (!this.drinks) {
        return [];
      }
      return this.drinks.filter((drink) =>
        drink.strDrink.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.getCocktails();
  },
  methods: {
    async getCocktails() {
      try {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php",
          {
            params: {
              c: "cocktail",
            },
          }
        );
        if (response.data.drinks) {
          this.drinks = response.data.drinks;
        } else {
          console.log("No drinks found");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
$primary: #eabc2a;
$secondary: #000;
$lightGray: #f1f2f3;
$darkGray: #222222;

.cocktail-list {
  &__card {
    border-radius: 8px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;
    position: relative;
    overflow: hidden;
    &:hover .cocktail-list__image {
      transform: scale(1.05);
    }
    a {
      text-decoration: none;
      color: $darkGray;
    }
  }

  &__image {
    display: flex;
    transition: 250ms ease-out;
    overflow: hidden;

    img {
      max-width: 100%;
      height: auto;
    }
  }
  &__header {
    text-align: center;
    position: absolute;
    color: #fff;
    bottom: 0;
    width: 100%;
    font-weight: 600;
    font-size: 0.9rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.66) 100%
    );
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  margin-bottom: 50px;
}

.row > * {
  width: 100%;
  flex: 0 0 calc(20% - 16px);
}

input[type="search"] {
  width: 400px;
  border: none;
  border-radius: 25px;
  padding: 12px 16px 12px 40px;
  background: #fff url(../assets/martini-glass-solid.svg) no-repeat 13px center;
  background-size: 16px;

  &:placeholder {
    color: $darkGray;
  }
}
.header {
  padding: 100px 0;
  width: 350px;
  span {
    color: $primary;
  }

  &-bigtext {
    font-size: 5rem;
  }
}

h1 {
  font-size: 3rem;
  margin: 0;
}
</style>
