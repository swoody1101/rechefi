import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function FreeBoardPagination({ totalPages, urlLink }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page"), totalPages);

  return (
    <Pagination
      page={page || 1}
      count={totalPages}
      siblingCount={1}
      sx={{
        mt: 1.5,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      size={"small"}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${urlLink}${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

export default FreeBoardPagination;
