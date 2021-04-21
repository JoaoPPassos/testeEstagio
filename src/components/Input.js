import "../styles/Input.css"

import SearchIcon from '../images/search.png'
export default function Input() {
  return (
    <div className="c-input">
      <input
        className="c-input__entrada"
        placeholder="Busque por estabelecimentos ou produtos">
      </input>
      <img className="c-input__icon" src={SearchIcon} alt="search" />
    </div>
  );
}