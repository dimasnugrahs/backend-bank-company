"use client";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Form({ blog, categoryblogs }) {
  const token = Cookies.get("currentUser");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(
    blog
      ? {
          name: blog.name,
          description: blog.description,
          categoryId: blog.categoryId,
          images: blog.images,
        }
      : {
          name: "",
          description: "",
          categoryId: "",
          images: [],
        }
  );

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.images.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select images",
      });
      return;
    }

    setIsLoading(true);

    const headers = {
      Authorization: token,
    };

    try {
      if (blog) {
        const response = await axios.patch(
          `/api/blogs/${blog.id}`,
          {
            ...form,
          },
          {
            headers,
          }
        );
      } else {
        const response = await axios.post(
          "/api/blogs",
          {
            ...form,
          },
          {
            headers,
          }
        );
      }

      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImages(e) {
    setIsLoading(true);
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const { data } = await axios.post("/api/images", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        ...form,
        images: [...form.images, ...data.images],
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteImage(filename, index) {
    setIsLoading(true);

    try {
      await axios.delete(`/api/images/${filename}`);

      const updatedPreviews = [...form.images];
      updatedPreviews.splice(index, 1);
      setForm({
        ...form,
        images: updatedPreviews,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  }
  // last update

  console.log(form);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black ">Contact Form</h3>
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
                    onChange={handleOnChange}
                    value={form.name}
                    placeholder="Judul"
                    disabled={isLoading}
                    className="w-full rounded border-[1px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-text-blue-700 dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Category
                </label>
                <select
                  required
                  disabled={isLoading}
                  value={form.categoryId} // Mengontrol nilai yang dipilih
                  name="categoryId"
                  onChange={handleOnChange}
                  className="w-full rounded border-[1px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                >
                  <option value="" className="text-body dark:text-bodydark">
                    Select Category
                  </option>
                  {categoryblogs.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="text-body dark:text-bodydark"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Images
                </label>
                <input
                  disabled={isLoading}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                  className="w-full cursor-pointer rounded-lg border-[1px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-black dark:focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Description
                </label>
                <textarea
                  disabled={isLoading}
                  rows={6}
                  name="description"
                  value={form.description}
                  onChange={handleOnChange}
                  className="w-full rounded border-[1px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                ></textarea>
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
      <div className="grid h-fit grid-cols-2 gap-5">
        {form.images.map((image, i) => (
          <div key={i} className="relative aspect-square rounded-md bg-white">
            <Image
              fill
              src={`/api/images/${image}`}
              alt="Preview"
              className="rounded-md object-cover"
            />
            <button
              onClick={() => handleDeleteImage(image, i)}
              className="absolute right-[-10px] top-[-10px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red text-white transition-all duration-150 hover:bg-opacity-90"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
