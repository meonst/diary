import { ClassName } from "@/app/lib/definitions";

const fileContainerCommonClassName: ClassName =
  "text-center items-center w-full grid";
const fileContainerOne: ClassName = "grid-cols-1 grid-rows-1";
const fileContainerTwo: ClassName = "grid-cols-2 grid-rows-1";
const fileContainerThree: ClassName = "grid-cols-2 grid-rows-2";
const fileContainerFour: ClassName = "grid-cols-2 grid-rows-2";

export const fileContainerClassNames: ClassName[] = [
  concatWithSpace(fileContainerCommonClassName, fileContainerOne),
  concatWithSpace(fileContainerCommonClassName, fileContainerTwo),
  concatWithSpace(fileContainerCommonClassName, fileContainerThree),
  concatWithSpace(fileContainerCommonClassName, fileContainerFour),
];


const fileOneOfOne: ClassName = "rounded-md ml-0.5 mr-0.5";

const fileOneOfTwo: ClassName = "rounded-l-md ml-0.5 mr-0.5";
const fileTwoOfTwo: ClassName = "rounded-r-md ml-0.5 mr-0.5";

const fileOneOfThree: ClassName = "row-span-2 rounded-l-md h-full ml-0.5 mr-0.5";
const fileTwoOfThree: ClassName = "row-span-1 rounded-tr-md ml-0.5 mr-0.5 mb-0.5";
const fileThreeOfThree: ClassName = "row-span-1 rounded-br-md ml-0.5 mr-0.5 mt-0.5";

const fileOneOfFour: ClassName = "rounded-tl-md ml-0.5 mr-0.5 mb-0.5";
const fileTwoOfFour: ClassName = "rounded-tr-md ml-0.5 mr-0.5 mb-0.5";
const fileThreeOfFour: ClassName = "rounded-bl-md ml-0.5 mr-0.5 mt-0.5";
const fileFourOfFour: ClassName = "rounded-br-md ml-0.5 mr-0.5 mt-0.5";

const fileCommonClassName: ClassName = "items-center justify-center flex relative border-1 overflow-hidden bg-black text-white";
export const fileClassNames = [
  [concatWithSpace(fileCommonClassName, fileOneOfOne)],
  [
    concatWithSpace(fileCommonClassName, fileOneOfTwo),
    concatWithSpace(fileCommonClassName, fileTwoOfTwo),
  ],
  [
    concatWithSpace(fileCommonClassName, fileOneOfThree),
    concatWithSpace(fileCommonClassName, fileTwoOfThree),
    concatWithSpace(fileCommonClassName, fileThreeOfThree),
  ],
  [
    concatWithSpace(fileCommonClassName, fileOneOfFour),
    concatWithSpace(fileCommonClassName, fileTwoOfFour),
    concatWithSpace(fileCommonClassName, fileThreeOfFour),
    concatWithSpace(fileCommonClassName, fileFourOfFour),
  ],
];

function concatWithSpace(head: string, tail: string) {
  const returnString: string = head + " " + tail;
  return returnString;
}
