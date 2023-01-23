<template>
  <div class="bg-header">
    <div class="container ca-gutter">
      <button @click="goBack" class="go-back-btn">Go back</button>
      <div v-if="drink">
        <div class="cocktail-detail__items-top">
          <p class="small-text">{{ drink.strCategory }}</p>
          <h1>{{ drink.strDrink }}</h1>
        </div>
        <div class="cocktail-detail__items-wrap">
          <div class="cocktail-detail__items-left">
            <img :src="drink.strDrinkThumb" alt="Image of cocktail" />
          </div>
          <div class="cocktail-detail__items-right">
            <p v-if="!ingredientsArray.length">
              No ingredients available
            </p>
            <span>
              <h4> Ingredients: </h4>
              <p
                v-for="(ingredient, index) in ingredientsArray"
                v-bind:key="index">
                • {{ ingredient.measurement }} {{ ingredient.ingredient }}
              </p>
            </span>
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
        const response = await this.axios.get(
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
        })
        .filter((item) => (item.ingredient && item.measurement));
    },
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@import '../variables';

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
    flex-direction: column;
    gap: 20px;

    @media screen and (min-width: 576px) {
      flex-direction: row;
      align-items: flex-start;
      width: 75%;
    }
  }

  &__items-top {
    margin: 25px 0;
    @media screen and (min-width: 992px) {
      margin: 75px 0 25px;
    }
    .small-text {
      font-weight: 600;
      font-size: 0.9rem;
      margin: 0;
    }
  }
  &__items-left {
    display: flex;

    @media screen and (min-width: 576px) { 
      width: 30%;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: $boxShadow;
    }
  }
  &__items-right {
    background-color: rgba(#fff, 0.8);
    border-radius: 8px;
    box-shadow: $boxShadow;
    flex-direction: column;
    padding: 25px;
    margin-bottom: 20px;
    width: 100%;

    @media screen and (min-width: 576px) { 
      width: 100%;
    }


    h4:first-child {
      margin-top: 0;
    }
  }

  &__top-item {
    display: flex;
  }
}
</style>
