import React from 'react';
import { useDispatch } from 'react-redux'
import moment from 'moment';
import { setInterventionDetailPanel } from '../../redux/settings/Action'

export default function InterventionDetail ({ data }) {
	
  const dispatch = useDispatch()
  return (
    <div className=" bg-slate-100 ring-1 ring-slate-200 h-full w-1/2 lg:w-1/3 absolute top-0 right-0 z-10 p-8 ">
      <button
        onClick={() =>
          dispatch(setInterventionDetailPanel({ isOpened: false, data: {} }))
        }
        className="absolute top-4 right-4 flex items-center justify-center lowercase font-extrabold text-base p-1 rounded-full w-10 h-10 bg-slate-300 hover:bg-slate-200 focus:bg-slate-300 focus:ring-2 ring-0 ring-slate-200"
      >
        X
      </button>
      <h3>
        N<sup>o</sup> Chassis: { data.tractor }
      </h3>
      <h4>Mecanicien: { data.mechanical }</h4>
      <h6>Date: {moment.unix(data.date).format("DD-MM-YYYY")}</h6>

      <div className="mt-12">
        <h5 className="text-center">Description</h5>
        <p className=" text-justify text-base font-medium text-gray-700">{ data.description }</p>
      </div>
    </div>
  );
}
