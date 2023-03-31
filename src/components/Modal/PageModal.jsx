import React from "react"
import { X } from "react-feather"
import { Modal } from "@mui/material"

export default function PageModal({ open, isClose, children }) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <section className="flex items-center justify-center w-screen h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full h-5/3 relative">
          <i
            className="absolute top-5 right-5 cursor-pointer"
            onClick={isClose}
          >
            <X className="text-gray-400 hover:text-gray-600 transition-all" />
          </i>
          {children}
        </div>
      </section>
    </Modal>
  )
}
