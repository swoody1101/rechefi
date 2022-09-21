import Swal from "sweetalert2";
import { Palette } from "../styles/palette";

export function Warn(title) {
  Swal.fire({
    icon: "warning",
    title: title,
    timer: 1500,
    showConfirmButton: false,
  });
}

export function Success(title) {
  Swal.fire({
    icon: "success",
    title: title,
    timer: 1500,
    showConfirmButton: false,
  });
}

export function Confirm(title, onConfirm, onCancel) {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonColor: Palette.mainColor4,
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm) onConfirm();
    } else {
      if (onCancel) onCancel();
    }
  });
}
