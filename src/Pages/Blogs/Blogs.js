import { Disclosure } from '@headlessui/react'
import { FaChevronCircleDown } from 'react-icons/fa';


export default function Example() {
  

  return (
      <div className="w-full px-4 pt-16 grid grid-cols-1 lg:grid-cols-2">
             <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What are the different ways to manage a state in a React application??</span>
                <FaChevronCircleDown
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              With a lot of trial and error, pilot programs, and personal observance, it has been proven that React Native apps can be structured into 5 types of state. Each type of state follows a set of defined rules and interacts with one another in a particular manner.They are following:
                              <li>Communication State</li>
                              <li>Data State</li>
                              <li>Control State</li>
                              <li>Session State</li>
                              <li>Location State</li>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How does prototypical inheritance work?</span>
                <FaChevronCircleDown
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
              </Disclosure.Panel>
            </>
          )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What is a unit test? Why should we write unit tests?</span>
                <FaChevronCircleDown
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Unit testing is testing the smallest testable unit of an application. It is done during the coding phase by the developers. To perform unit testing, a developer writes a piece of code (unit tests) to verify the code to be tested (unit) is correct.Developers write unit tests for their code to make sure that the code works correctly. This helps to detect and protect against bugs in the future. Sometimes developers write unit tests first, then write the code. This approach is also known as test-driven development (TDD).
              </Disclosure.Panel>
            </>
          )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>React vs. Angular vs. Vue?</span>
                <FaChevronCircleDown
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          Angular, React, and Vue are the most popular frameworks for any project that has something to do with JavaScript, from creating mobile, small-scale applications to building intuitive user interfaces for business web apps. Difference between them in bellow:
                              <br />
                              <strong className='text-blue-600'>React</strong> is the most popular front-end JavaScript framework of today. It was created by Jordan Walke, a software engineer at Facebook (recently rebranded as Meta), in 2011 under FaxJs. Best used for designing dynamic and interactive user interfaces (UI).
                              <br />
                              <strong className='text-blue-600'>Angular,</strong> developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. A substantial shift occurred in 2016 on the release of Angular 2 (and the dropping of the “JS” from the original name - AngularJS).
                              <br />
                              <strong className='text-blue-600'>Vue</strong>combines two essential aspects of its rivals: Angular's two-way data binding and React's virtual DOM. Free and open-source like the others, Vue distinguishes itself as a flexible and lightweight framework.
                              
                             
                            
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
          <div className='w-full'>
          
          </div>
       
    </div>
  )
}
