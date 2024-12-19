"use client";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Form({ categoryblogs }) {
  const token = Cookies.get("currentUser");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(categoryblogs ? categoryblogs.name : "");

  function handleChange(event) {
    setName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (categoryblogs) {
        await axios.patch(
          `/api/categoryblogs/${categoryblogs.id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `/api/categoryblogs`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
      }

      router.push("/categoryblog");
      router.refresh();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err?.message || err,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black ">Category Form</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-full">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={name}
                    placeholder="Judul"
                    disabled={isLoading}
                    className="w-full rounded border-[1px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-text-blue-700 dark:focus:border-primary"
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                className="flex w-full justify-center rounded bg-blue-600 text-white p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
