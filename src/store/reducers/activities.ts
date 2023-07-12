import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import client from '../../axios';

export interface Activity {
  name: string;
  location: string;
  price: number;
  time: string;
}

export interface ActivityState {
  activities: Activity[];
}
const initialState: ActivityState = {
  activities: [],
};

export interface ActivityByDate {
  date: any;
  travelId: number;
}

export async function getActivityByDate(activity: ActivityByDate) {
  const query = `
    query ActivitiesByDate {
      activitiesByDate(date: "${activity.date}", id: ${activity.travelId}) {
        date
        id
        time
        price
        name
        members
        location
        travelId
        category {
          name
        }
      }
    }
    `;
  try {
    const { data } = await client.axios.post('', {
      query,
    });
    return data.data.activitiesByDate;
  } catch (error) {
    console.log(error);
    throw new Error('Une erreur est survenu');
  }
}

export const addActivity = createAsyncThunk(
  'activity/add-activity',
  async (newActivity: any) => {
    const addActivityQuery = `
      mutation Mutation {
        createActivity(createActivityInput: {
          name: "${newActivity.name}",
          price: ${newActivity.price},
          location: "${newActivity.location}",
          members: ${newActivity.members},
          time: "${newActivity.time}",
          date: "${newActivity.date}",
          travelId: ${newActivity.travelId},
          categoryId: ${newActivity.categoryId},    
        }) {
          name
          price
          location
          members
          time
          date
          travelId
          categoryId
        }
      }
    `;
    console.log(addActivityQuery);
    const response = await client.axios.post('', {
      query: addActivityQuery,
    });
    console.log(response.data);
    return response.data;
  }
);

const activitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(addActivity.fulfilled, (state, action) => {
    console.log(action.payload);
    // state.activity.push(action.payload);
  });
});

export default activitiesReducer;
