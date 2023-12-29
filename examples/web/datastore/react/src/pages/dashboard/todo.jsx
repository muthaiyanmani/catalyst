import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";

const initialValues = {
  title: "",
  description: ""
};

export default function TodoList() {
  const [newTodo, setNewTodo] = useState(initialValues);
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const query =
    "SELECT ROWID as id, CREATEDTIME, title, description FROM MyTodos WHERE is_completed=false";
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const resp = await window.catalyst.ZCatalystQL.executeQuery(query);
        const rows = resp.content || [];
        const data = rows.map((row) => row.MyTodos);
        setTodos(data);
      } catch (err) {
        alert("Something went wrong! Please try again.");
      }
    };
    fetchTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const tableInstance = window.catalyst.table.tableId("MyTodos");
      const resp = await tableInstance.addRow([newTodo]);
      const todoDetails = resp.content[0];
      setTodos([todoDetails, ...todos]);
      setNewTodo(initialValues);
      setOpen(false);
    } catch (err) {
      alert("Something went wrong! Please try again.");
    }
  };

  const markAsComplete = async (id) => {
    try {
      const tableInstance = window.catalyst.table.tableId("MyTodos");
      await tableInstance.updateRow([{ ROWID: id, is_completed: true }]);
      const updatedTodos = todos.filter((todo) => todo.ROWID !== id);
      setTodos(updatedTodos);
    } catch (err) {
      alert("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            My Todos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Your tasks, your way, your productivity journey.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Todo
          </button>
        </div>
      </div>
      {todos.length ? (
        <div className="flow-root mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                <table className="min-w-full divide-y divide-gray-300 table-fixed">
                  <thead>
                    <tr>
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        {" "}
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Task
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Created Time
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {todos.map(({ ROWID, title, CREATEDTIME, description }) => (
                      <tr key={ROWID}>
                        <td className="relative px-7 sm:w-12 sm:px-6"></td>
                        <td className="py-4 pr-3 text-sm font-medium whitespace-nowrap">
                          {title}
                        </td>
                        <td className="py-4 pr-3 text-sm font-medium whitespace-nowrap">
                          {description}
                        </td>
                        <td className="py-4 pr-3 text-sm font-medium whitespace-nowrap">
                          {CREATEDTIME}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                          <button
                            onClick={() => markAsComplete(ROWID)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Mark as Complete
                            <span className="sr-only">, {ROWID}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-40 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No tasks found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Todo
            </button>
          </div>
        </div>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-gray-900"
                        >
                          Create new todo
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="p-2 space-y-4">
                            <div className="space-y-2">
                              <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="title"
                              >
                                Title
                              </label>
                              <input
                                className="flex h-10 px-3 py-2 text-sm border rounded-md w-96 border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required=""
                                id="title"
                                type="text"
                                onChange={(e) =>
                                  setNewTodo({
                                    ...newTodo,
                                    title: e.target.value
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="description"
                              >
                                Description
                              </label>
                              <textarea
                                className="flex w-full px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="description"
                                rows={5}
                                type="text"
                                onChange={(e) =>
                                  setNewTodo({
                                    ...newTodo,
                                    description: e.target.value
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="gap-10 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-8">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                      onClick={createTodo}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
