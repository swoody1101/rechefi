import Swal from "sweetalert2";

export function Warn(title) {
  Swal.fire({
    icon: "warning",
    title: title,
    timer: 1500,
    showConfirmButton: false,
  });
}
