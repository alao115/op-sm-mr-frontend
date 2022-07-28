import { useState } from "react";
import { Tab } from "@headlessui/react";
import { CardBody, Spinner } from "reactstrap";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs(
  { tabData, childFn, loadingState } = {
    tabData: {},
    childFn: () => {},
    loadingState: true,
  }
) {

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-blue-900/20 p-1">
          {Object.keys(tabData).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-900"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {loadingState ? (
            <CardBody className="text-center">
              <h4>Chargement...</h4>
              <Spinner style={{ width: "5rem", height: "5rem" }} />
            </CardBody>
          ) : (
            Object.values(tabData).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
                )}
              >
                {childFn(posts)}
              </Tab.Panel>
            ))
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
