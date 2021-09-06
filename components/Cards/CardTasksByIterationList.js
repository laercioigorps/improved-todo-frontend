import { useActiveIteration, useTasksByIteration } from "../../data/use-data";

function CardTasksByIterationList(props) {
  const { iteration, iterationLoading, iterationLoggedOut, iterationError } =
    useActiveIteration();
  const { tasks, tasksLoading, tasksError, tasksLoggedOut, tasksMutate } =
    useTasksByIteration(iteration ? iteration.id : null);
  

  async function handleChange(task) {
    const res = await fetch("http://127.0.0.1:8000/delivery/" + task.id + "/", {
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        step: task.step,
        iteration: task.iteration,
        completed: !task.completed,
      }),
      headers: {
        Authorization: "Token " + localStorage.token,
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();

    console.log(result);
    if (result.id) {
      console.log("done");
    } else {
      console.log(result);
    }
    tasksMutate();
  }

  const list = tasks
    ? tasks.map((task) =>
        task.iteration == iteration.id && !task.completed ? (
          <tr
            key={task.id}
            className={
              task.completed === true ? "line-through text-gray-600" : ""
            }
          >
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-left ">
              <a className="hover:text-blue-600 " href={"/tasks/" + task.id}>
                {task.name}
              </a>
            </th>
            <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
              <input
                type="checkbox"
                name={"task" + task.id}
                id={task.id}
                checked={task.completed === true ? "checked" : ""}
                onChange={() => handleChange(task)}
              />
            </td>
          </tr>
        ) : null
      )
    : null;

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                To do
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-green-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Edit
              </button>
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See All
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Tasks
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Completed
                </th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default CardTasksByIterationList;
