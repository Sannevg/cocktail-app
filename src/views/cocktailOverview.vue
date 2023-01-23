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
    <div v-if="filteredDrinks.length" class="row">
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
    <div v-else>
      <h3>No cocktail's found. Can you make me one?</h3>
      <iframe
        src="https://giphy.com/embed/LCByYaCXWmwCY"
        width="500"
        height="270"
        frameBorder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "cocktailOverview",
  data() {
    return {
      drinks: [],
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
        const response = await this.axios.get(
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
@import "../variables";

.cocktail-list {
  &__card {
    border-radius: 8px;
    box-shadow: $boxShadow;
    position: relative;
    overflow: hidden;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
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
  justify-content: space-evenly;
  row-gap: 12px;
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 50px;
}

.row > * {
  flex: 0 0 45%;
  display: flex;
}

@media screen and (min-width: 1400px) {
  //larger screens
  .row {
    row-gap: 30px;
    & > * {
      flex: 0 0 18%;
    }
  }
}

@media screen and (min-width: 576px) and (max-width: 1399px) {
  // mobile +
  .row {
    row-gap: 20px;
    & > * {
      flex: 0 0 22%;
      justify-content: center;
    }
  }
}

input[type="search"] {
  width: 100%;
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
  padding: 25px 0;
  width: 350px;
  @media screen and (min-width: 992px) {
    padding: 100px 0;
  }
  
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
