"use client";
import { emailsContext } from "@/context/emailsContext";
import { useContext, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from "../ui/animated-modal";
import { Input } from "./input";
import { Label } from "./label";
import { ProcessLoader } from "./ProcessLoader";


export function AnimatedModalButton() {



  const [campaignInfo, setCampaignInfo] = useState({
    founder: "",
    industry: "",
    purpose: "",
    name: "",
    contact: "",
    location: "",
    website: "",
  });
  const { emailsData } = useContext(emailsContext);


  const handleOnClick = async () => {
    if (emailsData.length == 0) {
      alert("Please upload Emails")
      return
    }
    if (campaignInfo.contact == "" || campaignInfo.founder == "" || campaignInfo.industry == "" || campaignInfo.location == "" || campaignInfo.name == "" || campaignInfo.purpose == "" || campaignInfo.website == "") {
      alert("Please Fill All Fields")
      return
    }
    await fetch("/api/send-mail",
      {
        method: "POST",
        body: JSON.stringify({ campaignInfo, emails: emailsData })
      }
    )
  }

  return (
    <div className="py-4 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black w-full dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="text-center">
            Run Campaign
          </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Run Campaign With{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Infinty AI
              </span>{" "}
              🚀
            </h4>
            <div className=" justify-center items-center">
              <Label className="my-4">
                Enter about your campaign details
              </Label>
              <Input placeholder="Enter Founder Name"
                className="w-full my-2"
                required
                onChange={
                  (e) => {
                    setCampaignInfo({
                      ...campaignInfo,
                      founder: e.target.value
                    })
                  }}
              />
              <Input placeholder="Enter Your Industry"
                className="w-full my-2"
                required
                onChange={
                  (e) => {
                    setCampaignInfo({
                      ...campaignInfo,
                      industry: e.target.value
                    })
                  }}
              />
              <div className="flex flex-row">
                <Input placeholder="Enter Purpose"
                  className="w-3/6 my-2 mr-6"
                  required
                  onChange={
                    (e) => {
                      setCampaignInfo({
                        ...campaignInfo,
                        purpose: e.target.value
                      })
                    }}
                />
                <Input placeholder="Product/Service Name"
                  className="w-3/6 my-2"
                  required
                  onChange={
                    (e) => {
                      setCampaignInfo({
                        ...campaignInfo,
                        name: e.target.value
                      })
                    }
                  }
                />
              </div>

              <Input placeholder="Contact Number"
                className="w-full my-2 "
                required
                onChange={
                  (e) => {
                    setCampaignInfo({
                      ...campaignInfo,
                      contact: e.target.value
                    })
                  }
                }
              />

              <div className="flex flex-row">
                <Input placeholder="Location"
                  className="w-3/6 my-2 mr-6"
                  required
                  onChange={
                    (e) => {
                      setCampaignInfo({
                        ...campaignInfo,
                        location: e.target.value
                      }
                      )
                    }
                  }
                />
                <Input placeholder="Website"
                  required
                  className="w-3/6 my-2"
                  onChange={
                    (e) => {
                      setCampaignInfo({
                        ...campaignInfo,
                        website: e.target.value
                      }
                      )
                    }
                  }
                />

              </div>
            </div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex  items-center justify-center">
                <RocketIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Super Fast AI Agents
                </span>
              </div>
              <div className="flex items-center justify-center">
                <ElevatorIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  1000+ leads
                </span>
              </div>
            </div>
          </ModalContent>
          <ProcessLoader
            handleOnClick={handleOnClick}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

const RocketIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 12l-18 -6l15 6l-6 6l10 4z" />
    </svg>
  );
};



const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};