import React from 'react'

interface IAutoComplete {
  isVisible?: boolean
  suggestions: string[]
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
  handleSuggestionClick: (suggestion: string) => void
}

function AutoComplete({
  suggestions,
  handleSuggestionClick,
}: IAutoComplete): JSX.Element {
  const [isVisible, setIsVisible] = React.useState<boolean>(
    suggestions?.length > 0 ? true : false
  )
  return (
    <div
      className={`${
        isVisible
          ? 'container absolute z-50 block rounded-md bg-gray-200 sm:w-full'
          : 'hidden'
      }`}
    >
      <ul>
        {suggestions.map((email, index) => (
          <li
            className="cursor-pointer border border-none p-2 hover:bg-gray-800 hover:text-gray-200 "
            key={index}
            onClick={() => {
              handleSuggestionClick(email)
              setIsVisible(false)
            }}
          >
            {email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AutoComplete