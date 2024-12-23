import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const SelectCountry = ({
  name,
  value,
  onChange,
  disabled = false,
  sx = {},
}) => {
  return (
    <Select
      name={name}
      value={value || ""}
      onChange={onChange}
      fullWidth
      disabled={disabled}
      sx={{
        width: "100%",
        height: "40px",
        border: "none",
        borderRadius: "7px",
        ...sx,
      }}
    >
      <MenuItem value="Afghanistan">Afghanistan</MenuItem>
      <MenuItem value="Argentina">Argentina</MenuItem>
      <MenuItem value="Australia">Australia</MenuItem>
      <MenuItem value="Austria">Austria</MenuItem>
      <MenuItem value="Bahrain">Bahrain</MenuItem>
      <MenuItem value="Bangladesh">Bangladesh</MenuItem>
      <MenuItem value="Bhutan">Bhutan</MenuItem>
      <MenuItem value="Bolivia">Bolivia</MenuItem>
      <MenuItem value="Brazil">Brazil</MenuItem>
      <MenuItem value="Brunei">Brunei</MenuItem>
      <MenuItem value="Bulgaria">Bulgaria</MenuItem>
      <MenuItem value="Cambodia">Cambodia</MenuItem>
      <MenuItem value="Canada">Canada</MenuItem>
      <MenuItem value="China">China</MenuItem>
      <MenuItem value="Colombia">Colombia</MenuItem>
      <MenuItem value="Denmark">Denmark</MenuItem>
      <MenuItem value="Egypt">Egypt</MenuItem>
      <MenuItem value="Finland">Finland</MenuItem>
      <MenuItem value="France">France</MenuItem>
      <MenuItem value="Germany">Germany</MenuItem>
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Indonesia">Indonesia</MenuItem>
      <MenuItem value="Iran">Iran</MenuItem>
      <MenuItem value="Iraq">Iraq</MenuItem>
      <MenuItem value="Italy">Italy</MenuItem>
      <MenuItem value="Japan">Japan</MenuItem>
      <MenuItem value="Jordan">Jordan</MenuItem>
      <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
      <MenuItem value="Korea (North)">Korea (North)</MenuItem>
      <MenuItem value="Korea (South)">Korea (South)</MenuItem>
      <MenuItem value="Kuwait">Kuwait</MenuItem>
      <MenuItem value="Laos">Laos</MenuItem>
      <MenuItem value="Malaysia">Malaysia</MenuItem>
      <MenuItem value="Maldives">Maldives</MenuItem>
      <MenuItem value="Mexico">Mexico</MenuItem>
      <MenuItem value="Monaco">Monaco</MenuItem>
      <MenuItem value="Myanmar (Burma)">Myanmar (Burma)</MenuItem>
      <MenuItem value="Nepal">Nepal</MenuItem>
      <MenuItem value="Oman">Oman</MenuItem>
      <MenuItem value="Pakistan">Pakistan</MenuItem>
      <MenuItem value="Philippines">Philippines</MenuItem>
      <MenuItem value="Qatar">Qatar</MenuItem>
      <MenuItem value="Russia">Russia</MenuItem>
      <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
      <MenuItem value="Singapore">Singapore</MenuItem>
      <MenuItem value="Spain">Spain</MenuItem>
      <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
      <MenuItem value="Thailand">Thailand</MenuItem>
      <MenuItem value="Turkey">Turkey</MenuItem>
      <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
      <MenuItem value="United States">United States</MenuItem>
      <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
      <MenuItem value="Vietnam">Vietnam</MenuItem>
      <MenuItem value="Yemen">Yemen</MenuItem>
      <MenuItem value="Zambia">Zambia</MenuItem>
      <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
    </Select>
  );
};

SelectCountry.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default SelectCountry;
