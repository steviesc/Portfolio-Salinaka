import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import "../Home/Content_Style.css";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters, resetFilters } from "../../store/count";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  height: 465,
  bgcolor: "background.paper",
  border: "1.5px solid grey",
  boxShadow: 24,
  p: 4,
};

function valuetext(value) {
  return `${value}°C`;
}

export default function Filter() {
  //pop up
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ticks = [];
  for (let i = 0; i < 6; i++) {
    ticks.push(
      <div key={`tick-${i}`}>
        <div
          style={{
            position: "absolute",
            marginTop: "17px",
            width: "1px",
            height: "5px",
            backgroundColor: "rgb(200, 200, 200)",
            left: `${5.43657 + i * 5.437657 * 3}%`,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            marginTop: "25px",
            width: "16.66667%",
            fontSize: "10px",
            marginLeft: "-8.33333%",
            left: `${5.43657 + i * 5.437657 * 3}%`,
            textAlign: "center",
          }}
        >
          {100 + i * 100}
        </div>
      </div>
    );
  }

  //filter
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.countStore.filters);
  const [localFilters, setLocalFilters] = useState({
    priceRange: [56, 674],
    brand: "",
    sortBy: "",
  });
  const handleApply = () => {
    if (localFilters) {
      dispatch(updateFilters(localFilters));
      handleClose();
    }
  };

  const handleReset = () => {
    dispatch(resetFilters());
    handleClose();
    console.log("local filters", localFilters);
    setLocalFilters({ priceRange: [56, 674], brand: "", sortBy: "" });
  };

  const handleChangeValue = (event, newValue) => {
    if (localFilters) {
      setLocalFilters((prev) => ({ ...prev, priceRange: newValue }));
    }
  };

  const handleInputChange = (index) => (event) => {
    if (localFilters && localFilters.priceRange) {
      const newValue = [...localFilters.priceRange];
      newValue[index] =
        event.target.value === "" ? "" : Number(event.target.value);
      setLocalFilters((prev) => ({ ...prev, priceRange: newValue }));
    }
  };

  const handleChangeBrand = (event) => {
    setLocalFilters((prev) => ({ ...prev, brand: event.target.value }));
  };
  const handleChangeSortBy = (event) => {
    setLocalFilters((prev) => ({ ...prev, sortBy: event.target.value }));
  };
  return (
    <div className="filters-toggle">
      <button className="button-muted button-small" onClick={handleOpen}>
        Filters{" "}
        <span className="anticon anticon-filter">
          <FilterAltIcon />
        </span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="filters-toggle-sub">
            <div className="filters">
              <div className="filters-field">
                <span>Brand</span>
                <br />
                <br />
                <select
                  className="filters-brand"
                  value={localFilters.brand}
                  onChange={handleChangeBrand}
                >
                  <option value="">All Brands</option>
                  <option value="salt maalat">Salt Maalat</option>
                  <option value="betsin maalat">Betsin Maalat</option>
                  <option value="black kibal">Black Kibal</option>
                  <option value="sexbomb">Sexbomb</option>
                </select>
              </div>
              <div className="filters-field">
                <span>Sort By</span>
                <br />
                <br />
                <select
                  className="filters-sort-by d-block"
                  value={localFilters.sortBy}
                  onChange={handleChangeSortBy}
                >
                  <option value="">None</option>
                  <option value="name-asc">Name Ascending A - Z</option>
                  <option value="name-desc">Name Descending Z - A</option>
                  <option value="price-desc">Price High - Low</option>
                  <option value="price-asc">Price Low - High</option>
                </select>
              </div>
              <div className="filters-field">
                <span>Price Range</span>
                <br />
                <br />
                <div style={{ height: "120px", width: "100%" }}>
                  <div className="price-range-control">
                    <input
                      className="price-range-input"
                      type="number"
                      // value={value[0]}
                      value={
                        localFilters && localFilters.priceRange
                          ? localFilters.priceRange[0]
                          : ""
                      }
                      max="674"
                      min="56"
                      onChange={handleInputChange(0)}
                      // onBlur={handleBlur}
                    />
                    —
                    <input
                      className="price-range-input"
                      type="number"
                      // value={value[1]}
                      value={localFilters.priceRange[1]}
                      max="674"
                      min="56"
                      onChange={handleInputChange(1)}
                      // onBlur={handleBlur}
                    />
                  </div>
                  <Box sx={{ width: 370 }}>
                    <Slider
                      getAriaLabel={() => "Price range"}
                      value={localFilters.priceRange}
                      onChange={handleChangeValue}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      min={56} 
                      max={674} 
                      sx={{
                        "& .MuiSlider-track": {
                          color: "orange", 
                        },
                      }}
                    />
                  </Box>
                  <div className="slider-ticks">{ticks}</div>
                </div>
              </div>
              <div className="filters-action" style={{ marginTop: "10px" }}>
                <button
                  className="filters-button button button-small"
                  onClick={handleApply}
                >
                  Apply filters
                </button>
                <button
                  className="filters-button button button-border button-small"
                  onClick={handleReset}
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
