export const OK = 200; // 요청 수행
export const CREATED = 201; // 생성 완료
export const ACCEPTED = 202; // 요청받았지만 그에 응할 수 없음.(바쁨)
export const NO_CONTENT = 204; // 요청에 대한 반환 값이 없음.(삭제)

export const BAD_REQUEST = 400; // 요청이 적절하지 않음
export const FOBIDDEN = 403; // 권한없음. 거절
export const NOT_FOUND = 404; // 찾지못함
export const CONFLICT = 409; // 서버 상태와 충돌됨(중복?)
