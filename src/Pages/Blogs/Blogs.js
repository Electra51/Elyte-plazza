import { Disclosure } from "@headlessui/react";
import { FaChevronCircleDown } from "react-icons/fa";
import blogImage from "../../assets/images/1.png";
import { Accordion, AccordionTab } from 'primereact/accordion';
import "../BookingModal/new.css"

export default function Example() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-16 grid grid-cols-1 lg:grid-cols-2 items-start pb-8">
      <Accordion activeIndex={0}>
        <AccordionTab header="What are the different ways to manage a state in a React
                  application??">
          <p className="m-0 p-4">

            With a lot of trial and error, pilot programs, and personal
            observance, it has been proven that React Native apps can be
            structured into 5 types of state. Each type of state follows a
            set of defined rules and interacts with one another in a
            particular manner.They are following:
            <li>Communication State</li>
            <li>Data State</li>
            <li>Control State</li>
            <li>Session State</li>
            <li>Location State</li>
          </p>
        </AccordionTab>
        <AccordionTab header="How does prototypical inheritance work?">
          <p className="m-0 p-4">
            The Prototypal Inheritance is a feature in javascript used to
            add methods and properties in objects. It is a method by which
            an object can inherit the properties and methods of another
            object. Traditionally, in order to get and set the [[Prototype]]
            of an object, we use Object. getPrototypeOf and Object.
          </p>
        </AccordionTab>
        <AccordionTab header=" What is a unit test? Why should we write unit tests?">
          <p className="m-0 p-4">
            Unit testing is testing the smallest testable unit of an
            application. It is done during the coding phase by the
            developers. To perform unit testing, a developer writes a piece
            of code (unit tests) to verify the code to be tested (unit) is
            correct.Developers write unit tests for their code to make sure
            that the code works correctly. This helps to detect and protect
            against bugs in the future. Sometimes developers write unit
            tests first, then write the code. This approach is also known as
            test-driven development (TDD).
          </p>
        </AccordionTab>
        <AccordionTab header="React vs. Angular vs. Vue?">
          <p className="m-0 p-4">
            Angular, React, and Vue are the most popular frameworks for any
            project that has something to do with JavaScript, from creating
            mobile, small-scale applications to building intuitive user
            interfaces for business web apps. Difference between them in
            bellow:
            <br />
            <strong className="text-blue-600">React</strong> is the most
            popular front-end JavaScript framework of today. It was created
            by Jordan Walke, a software engineer at Facebook (recently
            rebranded as Meta), in 2011 under FaxJs. Best used for designing
            dynamic and interactive user interfaces (UI).
            <br />
            <strong className="text-blue-600">Angular,</strong> developed by
            Google, was first released in 2010, making it the oldest of the
            lot. It is a TypeScript-based JavaScript framework. A
            substantial shift occurred in 2016 on the release of Angular 2
            (and the dropping of the “JS” from the original name -
            AngularJS).
            <br />
            <strong className="text-blue-600">Vue</strong>combines two
            essential aspects of its rivals: Angular's two-way data binding
            and React's virtual DOM. Free and open-source like the others,
            Vue distinguishes itself as a flexible and lightweight
            framework.
          </p>
        </AccordionTab>
      </Accordion>


      <div
        className="w-full mb-20"
        data-aos="fade-up-left"
        data-aos-duration="3000"
      >
        <img src={blogImage} alt="" />
      </div>
    </div>
  );
}
