import { shallowMount } from '@vue/test-utils';
import cocktailOverview from '../../src/views/cocktailOverview.vue';

describe('TvShowsSearchComponent.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(cocktailOverview, {
      global: {
        mocks: {
          axios: {
            get: async () => ({}),
          }
        }
      }
    });
  });

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });

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

    jest.spyOn(wrapper.vm.axios, 'get').mockReturnValue({ data: mockData});

    await wrapper.vm.getCocktails()

    expect(wrapper.vm.axios.get).toHaveBeenCalled();
    expect(wrapper.vm.axios.get).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
      {
        params: {
          c: 'cocktail'
        }
      }
    )

    expect(wrapper.vm.drinks).toEqual(mockData.drinks)
  })
});
