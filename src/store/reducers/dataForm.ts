import client from '../../axios';


export interface RecapFormProps {
  title: string;
  departureDate: string;
  arrivalDate: string;
  budget: string;
}

export async function getRecapForm(id: any) {
  try {
    const response = await client.axios.post('', {
      query: `query Query {
                travel(id: ${id}) {
                  arrivalDate
                  travelers {
                    firstname
                    lastname
                  }
                  budget
                  departureDate
                  numberOfTravelers
                  title
                }
              }
              `,
    });
    return response.data.data.travel;
  } catch (error) {
    console.log(error);
    throw new Error('Une erreur est survenu');
  }
}
