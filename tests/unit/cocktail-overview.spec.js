import axios from 'axios'
import { mount } from '@vue/test-utils'
import cocktailOverview from './cocktailOverview.vue'

jest.mock('axios')

describe('cocktailOverview', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(cocktailOverview)
  })

  test('should get list of cocktails', async () => {
    const mockData = {
      drinks: [
        {
          idDrink: '123',
          strDrink: 'Mock Cocktail 1',
          strDrinkThumb: 'mock-image-url-1.jpg'
        },
        {
          idDrink: '456',
          strDrink: 'Mock Cocktail 2',
          strDrinkThumb: 'mock-image-url-2.jpg'
        }
      ]
    }
    axios.get.mockResolvedValue({ data: mockData })

    await wrapper.vm.getCocktails()

    expect(axios.get).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
      {
        params: {
          c: 'cocktail'
        }
      }
    )

    expect(wrapper.vm.drinks).toEqual(mockData.drinks)
  })
})

