import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const getActivityByDate = createAsyncThunk(
  'activity/get-activity-by-date',
  async (activity) => {
    const query = `
query ActivitiesByDate {
  activitiesByDate(date: ${activity.date}, id: ${activity.travelId}) {
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
    const response = await axios.post('https://qwikle-server.eddi.cloud/', {
      query,
    });
    return response.data.data.activitiesByDate;
  }
);

export const addActivity = createAsyncThunk(
  'activity/add-activity',
  async (newActivity) => {
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
        }
      }
    `;
    const response = await axios.post('https://qwikle-server.eddi.cloud/', {
      query: addActivityQuery,
    });
    return response;
  }
);

const activitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(addActivity.fulfilled, (state, action) => {
    console.log(action.payload);
    // state.activity.push(action.payload);
  });
  builder.addCase(getActivityByDate.fulfilled, (state, action) => {
    state.activities = action.payload;
  });
});

export default activitiesReducer;
