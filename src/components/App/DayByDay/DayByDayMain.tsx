import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../hooks/redux';
import AddActivitiesTable from './ButtonAddActivitiesList';
import { getActivityByDate } from '../../../store/reducers/activities';

function DayByDayMain() {
  const [activities, setActivities] = useState([]);
  const dispatch = useAppDispatch();
  const voyageId = Number(useParams().voyage);
  const date = useParams().jour;
  useEffect(() => {
    getActivityByDate({
      date,
      travelId: voyageId,
    }).then((res) => {
      setActivities(res);
    });
  }, [dispatch, voyageId, date]);

  function formatTravelDate(dateTravel: any) {
    dayjs.locale('fr');
    const parsedDate = dayjs(dateTravel, 'YYYY-MM-DD');
    const formattedDate = parsedDate.format('DD MMMM YYYY');
    return formattedDate;
  }

  return (
    <div>
      <legend className="flex flex-col items-center bg-lightest rounded-md p-2 text-darkest text-xl">
        Toutes vos activités du :
        <div className="font-bold">{formatTravelDate(date)}</div>
      </legend>
      <div className="overflow-hidden flex items-center justify-center mt-10">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4" />
          <AddActivitiesTable />
          <div className="flex flex-auto">
            {/* Afficher les activités */}
            {activities && activities.length > 0 ? (
              activities.map((activity: any) => (
                <div key={activity.id} className="flex flex-auto">
                  <div className="relative bg-lightest-200 py-6 px-6 rounded-md w-64 my-4 mx-4 shadow-xl">
                    <div className=" text-white flex items-center absolute rounded-2xl py-4 px-4 shadow-xl bg-darkest left-4 -top-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="white"
                      >
                        <path d="M303.077-104.923v-357.692q-45.654-6.462-77.596-41.481-31.943-35.019-31.943-85.314v-266.282h36.924v266.153h72.615v-266.153H340v266.153h72v-266.153h36.923v266.282q0 50.295-31.634 85.314-31.635 35.019-77.289 41.481v357.692h-36.923Zm363.692 0v-317.538h-96v-255.693q0-64.963 35.885-115.828 35.885-50.864 97.039-59.557v748.616h-36.924Z" />
                      </svg>
                    </div>
                    <div className="mt-8">
                      <p className="text-xl font-semibold my-2">
                        {activity.name}
                      </p>
                      <div className="flex space-x-2 text-darkest-400 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p>{activity.location}</p>
                      </div>
                      <div className="flex space-x-2 text-darkest-400 text-sm my-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p>{activity.date}</p>
                      </div>
                      <div className="border-t-2" />

                      <div className="flex justify-between">
                        <div className="my-2">
                          <p className="font-semibold text-base mb-2">
                            Participants :
                          </p>
                          <div className="flex space-x-2">
                            {activity.members}
                          </div>
                        </div>
                        <div className="my-2">
                          <p className="font-semibold text-base mb-2">Prix</p>
                          <div className="text-base text-darkest-400 font-semibold">
                            <p>{activity.price} € </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative bg-lightest-200 py-6 px-6 rounded-md w-64 my-4 mx-4 shadow-xl">
                <div className=" text-white flex items-center absolute rounded-2xl py-4 px-4 shadow-xl bg-darkest left-4 -top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="white"
                  >
                    <path d="M163.077-299.385v72.308q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692h584.616q9.231 0 16.923-7.692 7.692-7.692 7.692-16.923v-72.308H163.077Zm161.23-375.692v-64.616q0-25.937 17.801-43.738 17.8-17.8 43.602-17.8h188.58q25.802 0 43.602 17.8 17.801 17.801 17.801 43.738v64.616h136.615q25.937 0 43.738 17.8 17.8 17.801 17.8 43.58v386.779q0 25.779-17.8 43.579-17.801 17.801-43.569 17.801H187.523q-25.768 0-43.569-17.801-17.8-17.8-17.8-43.579v-386.779q0-25.779 17.8-43.58 17.801-17.8 43.738-17.8h136.615Zm-161.23 292.615h633.846v-231.077q0-9.23-7.692-16.923-7.692-7.692-16.923-7.692H635.693v62.769h-36.924v-62.769H361.231v62.769h-36.924v-62.769H187.692q-9.231 0-16.923 7.692-7.692 7.693-7.692 16.923v231.077Zm198.154-292.615h237.538v-64.616q0-9.23-7.692-16.923-7.692-7.692-16.923-7.692H385.846q-9.231 0-16.923 7.692-7.692 7.693-7.692 16.923v64.616Zm-198.154 448v-411.077 62.769-62.769 62.769-62.769h24.615q-9.231 0-16.923 7.692-7.692 7.693-7.692 16.923v386.462q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692h-24.615v-24.615Z" />
                  </svg>
                </div>
                <div className="mt-8">
                  <p className="text-xl font-semibold my-2">
                    Pas encore d'actitivités
                  </p>
                  <div className="flex space-x-2 text-darkest-400 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p>Où se trouve votre première activité ?</p>
                  </div>
                  <div className="flex space-x-2 text-darkest-400 text-sm my-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Quel jour ?</p>
                  </div>
                  <div className="border-t-2" />

                  <div className="flex justify-between">
                    <div className="my-2">
                      <p className="font-semibold text-base mb-2">
                        Participants :
                      </p>
                      <div className="flex space-x-2">1 ou à plusieurs ?</div>
                    </div>
                    <div className="my-2">
                      <p className="font-semibold text-base mb-2">Prix</p>
                      <div className="text-base text-darkest-400 font-semibold">
                        <p>A définir </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayByDayMain;
