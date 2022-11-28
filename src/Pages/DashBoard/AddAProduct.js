import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import MyProducts from './MyProducts';



const AddAProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { data: categoryNames, isLoading } = useQuery({
        queryKey: ['Category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categoriesName');
            const data = await res.json();
            return data;
        }
    })
    const handleAddProduct = data => {
        console.log(data)
        const product = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            location: data.location,
            condition: data.condition,
            Category: data.Category,
            year: data.year,
            price: data.price,
            image: data.image,
        }
        fetch('http://localhost:5000/addProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${data.name} is added successfully`);
                navigate('/dashboard/myProducts')
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-full p-7'>

            <h2 className="text-4xl">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Product Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="text" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full " />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Year of Use</span></label>
                    <input type="text" {...register("year", {
                        required: true
                    })} className="input input-bordered w-full " />
                    {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Price</span></label>
                    <input type="text" {...register("price", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full " />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Phone</span></label>
                    <input type="text" {...register("phone", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full " />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Location</span></label>
                    <input type="text" {...register("location", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Product Condition</span></label>
                    <select
                        {...register('condition')}
                        className="select input-bordered w-full">
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Category</span></label>
                    <select
                        {...register('category')}
                        className="select input-bordered w-full">
                        {
                            categoryNames?.map(names => <option
                                key={names._id}
                                value={names.name}
                            >{names.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="text" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full " />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-4' value="Add Product" type="submit" />
            </form>
           
        </div>
    );
};

export default AddAProduct;