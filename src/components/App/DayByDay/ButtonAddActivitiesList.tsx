import { useState } from 'react';
import { useParams } from 'react-router';
import { addActivity } from '../../../store/reducers/activities';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type ListItem = {
  name: string;
  location: string;
  price: any;
  members: any;
  time: string;
  date: string;
  categoryId: any;
  travelId: any;
};

function AddActivitiesTable() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [members, setMembers] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);

  const dispatch = useAppDispatch();
  const { voyage } = useParams();
  const travelId = voyage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: ListItem = {
      name,
      location,
      price,
      members,
      time,
      date,
      categoryId,
      travelId,
    };

    const activitiesData = await dispatch(addActivity(newItem));
    // const activities = activitiesData.payload;
    console.log(activitiesData);

    setListItems([...listItems, newItem]);
    setName('');
    setLocation('');
    setPrice('');
    setMembers('');
    setTime('');
    setDate('');
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  return (
    <div className="overflow-hidden flex items-center justify-center">
      <div className="card bg-lightest shadow-xl flex items-center justify-center">
        <div className="card-body grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <input
                type="text"
                required
                id="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Titre de l'activité"
              />
            </div>
            <div className="mb-4">
              <select
                id="category"
                value={categoryId}
                onChange={handleCategoryChange}
                className="w-full p-2 border border-darkest-300 rounded-md"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="2">Activités</option>
                <option value="1">Repas</option>
                <option value="4">Hébergements</option>
                <option value="3">Trajets</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                required
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Lieu"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                required
                id="members"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Nombre de participants"
              />
            </div>
            <div className="mb-4">
              <input
                type="time"
                required
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Heure"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                required
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Date"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                required
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Prix"
              />
            </div>
            <button
              type="submit"
              className="btn btn-darkest bg-darkest text-lightest w-full hover:bg-lightest hover:text-darkest"
            >
              Ajouter une activité
            </button>
          </form>
        </div>
      </div>
      <div />
      <ol className="flex flex-wrap">
        {listItems.map((item, index) => (
          <li key={index} className="card">
            <div className="relative bg-lightest-200 py-6 px-6 rounded-md w-64 my-4 mx-4 shadow-xl">
              <div className=" text-white flex items-center absolute rounded-2xl py-4 px-4 shadow-xl bg-darkest left-4 -top-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="white"
                >
                  {categoryId === '1' && (
                    <path d="M303.077-104.923v-357.692q-45.654-6.462-77.596-41.481-31.943-35.019-31.943-85.314v-266.282h36.924v266.153h72.615v-266.153H340v266.153h72v-266.153h36.923v266.282q0 50.295-31.634 85.314-31.635 35.019-77.289 41.481v357.692h-36.923Zm363.692 0v-317.538h-96v-255.693q0-64.963 35.885-115.828 35.885-50.864 97.039-59.557v748.616h-36.924Z" />
                  )}
                  {categoryId === '4' && (
                    <path d="M126.154-244.307V-440q0-17.039 9.923-36.865 9.923-19.827 29.461-29.16v-89.685q0-32.098 22.388-54.502 22.388-22.404 54.536-22.404h179.384q20.024 0 34.428 8.5 14.404 8.5 23.726 23.5 9.322-15 23.726-23.5t34.428-8.5h179.384q32.148 0 54.536 22.349 22.388 22.35 22.388 54.442v89.671q19.538 9.462 29.461 29.289 9.923 19.826 9.923 36.865v195.693h-36.923v-79.385H163.077v79.385h-36.923Zm372.615-272.001h258.769v-79.432q0-16.879-11.447-28.416-11.447-11.537-28.368-11.537h-179.61q-16.959 0-28.151 11.537-11.193 11.537-11.193 28.592v79.256Zm-296.307 0h258.769V-595.8q0-16.893-11.111-28.393t-28.196-11.5h-179.57q-16.954 0-28.423 11.537-11.469 11.537-11.469 28.592v79.256Zm-39.385 155.693h633.846v-79.493q0-16.892-11.111-28.084-11.11-11.193-28.045-11.193H202.323q-16.861 0-28.054 11.111-11.192 11.111-11.192 28.099v79.56Zm633.846 0H163.077 796.923Z" />
                  )}
                  {categoryId === '2' && (
                    <path d="m216.769-190.808-25.961-25.961 404.576-404.962h-176.73v80h-36.923v-116.923h245.115q3.438 0 6.661 1.327 3.224 1.327 5.72 3.865l123.388 123.616q29.154 29.154 66.039 45.769 36.885 16.615 77.692 16.962v36.923q-48.384-.116-91.327-19.481-42.942-19.365-76.827-53.711l-52.5-52.347L559.577-430l85.654 85.654L426.308-217.5l-18.27-32.962L584-352.269 481.231-455.038l-264.462 264.23Zm-55.038-270.923v-36.923h156.923v36.923H161.731Zm-80-120v-36.923h156.923v36.923H81.731Zm697.33-80q-24.531 0-41.873-17.243-17.342-17.242-17.342-41.865t17.281-41.988q17.281-17.365 41.812-17.365t41.873 17.322q17.342 17.323 17.342 42.058t-17.281 41.908q-17.281 17.173-41.812 17.173Zm-617.33-40v-36.923h156.923v36.923H161.731Z" />
                  )}
                  {categoryId === '3' && (
                    <path d="M286.65-165.538q-8.223 0-13.591-5.082-5.367-5.082-5.367-13.072v-74.774q-19.538-7.188-40.846-34.922-21.308-27.734-21.308-63.843v-360.307q0-60.904 65.273-88.299 65.273-27.394 209.164-27.394 147.294 0 210.891 26.754 63.596 26.754 63.596 88.939v360.116q0 36.3-21.308 64.034-21.308 27.734-40.846 34.954v74.907q0 7.719-5.396 12.854-5.396 5.135-13.373 5.135h-6.581q-8.223 0-13.591-5.082Q648-175.702 648-183.692v-60.615H312v60.615q0 7.99-5.396 13.072-5.396 5.082-13.373 5.082h-6.581Zm193.196-568.616h235.077-470.154 235.077Zm158.719 254.769H242.462h475.076-78.973Zm-396.103-36.923h475.076v-180.923H242.462v180.923Zm98.877 179.077q18.123 0 30.7-12.685 12.576-12.686 12.576-30.808t-12.685-30.699Q359.244-424 341.122-424t-30.699 12.685q-12.577 12.686-12.577 30.808t12.686 30.699q12.685 12.577 30.807 12.577Zm277.539 0q18.122 0 30.699-12.685 12.577-12.686 12.577-30.808t-12.686-30.699Q636.783-424 618.661-424q-18.123 0-30.7 12.685-12.576 12.686-12.576 30.808t12.685 30.699q12.686 12.577 30.808 12.577ZM244.769-734.154h470.154q-11-30.961-64.981-46.558-53.981-15.596-170.096-15.596-116.169 0-170.334 15.52-54.166 15.519-64.743 46.634Zm76.666 452.923h317.13q32.704 0 55.839-23.283 23.134-23.283 23.134-55.978v-118.893H242.462v118.643q0 32.627 23.134 56.069 23.135 23.442 55.839 23.442Z" />
                  )}
                </svg>
              </div>
              <div className="mt-8">
                <p className="text-xl font-semibold my-2">{item.name}</p>
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
                  <p>{item.location}</p>
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
                  <p>{item.date}</p>
                </div>
                <div className="border-t-2" />

                <div className="flex justify-between">
                  <div className="my-2">
                    <p className="font-semibold text-base mb-2">Participants</p>
                    <div className="flex space-x-2">{item.members}</div>
                  </div>
                  <div className="my-2">
                    <p className="font-semibold text-base mb-2">Prix</p>
                    <div className="text-base text-darkest-400 font-semibold">
                      <p>{item.price} € </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AddActivitiesTable;
