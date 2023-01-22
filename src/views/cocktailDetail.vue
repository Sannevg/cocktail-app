<template>
  <div class="bg-header">
    <div class="container ca-gutter">
      <button @click="goBack" class="go-back-btn">Go back</button>
      <div v-if="drink">
        <div class="cocktail-detail__items-top">
          <p class="small-text">Cocktail</p>
          <h1>{{ drink.strDrink }}</h1>
        </div>
        <div class="cocktail-detail__items-wrap">
          <div class="cocktail-detail__items-left">
            <img :src="drink.strDrinkThumb" alt="Image of cocktail" />
          </div>
          <div class="cocktail-detail__items-right">
            <p v-if="ingredientsArray.length === null">
              No ingredients available
            </p>
            <p
              v-else
              v-for="(ingredient, index) in ingredientsArray"
              v-bind:key="index"
            >
            • {{ ingredient.measurement }} {{ ingredient.ingredient }}
            </p>
            <h4> Instructions: </h4>
            <p>{{ drink.strInstructions }}</p>
            <h4> Kind of glass: </h4>
            <p>{{ drink.strGlass }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cocktailDetail",
  data() {
    return {
      drink: null,
      ingredientsArray: null,
    };
  },
  mounted() {
    this.getCocktail();
  },
  methods: {
    async getCocktail() {
      const idDrink = this.$route.query.idDrink;
      try {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php",
          {
            params: {
              i: idDrink,
            },
          }
        );
        if (response.data.drinks) {
          this.drink = response.data.drinks[0];
        } else {
          console.log("No ingredients found");
        }
      } catch (error) {
        console.log(error);
      }
      this.ingredientsArray = Object.keys(this.drink)
        .filter((key) => key.includes("strIngredient"))
        .map((key) => {
          const index = key.replace("strIngredient", "");
          return {
            ingredient: this.drink[key],
            measurement: this.drink["strMeasure" + index],
          };
        });
    },
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
$primary: #eabc2a;
$secondary: #000;
$lightGray: #f1f2f3;
$darkGray: #222222;

$boxShadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;

.go-back-btn {
  background-color: transparent;
  border: 1px solid $secondary;
  padding: 12px 16px;
  border-radius: 25px;
  margin-top: 25px;

  &:hover {
    color: $secondary;
    background-color: $primary;
    border-color: $primary;
  }
}
.cocktail-detail {
  &__items-wrap {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    height: 100vh;
    width: 75%;
  }
  &__items-top {
    margin: 75px 0 25px;
    .small-text {
      font-weight: 600;
      font-size: 0.9rem;
      margin: 0;
    }
  }
  &__items-left {
    display: flex;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: $boxShadow;
    }
  }
  &__items-right {
    background-color: rgba(#fff,0.8);
    border-radius: 8px;
    box-shadow: $boxShadow;
    flex-direction: column;
    width: 100%;
    padding: 25px;
  }

  &__top-item {
    display: flex;
  }
}
</style>
