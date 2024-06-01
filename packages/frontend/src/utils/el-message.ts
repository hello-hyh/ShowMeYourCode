export const elSuccessMsg = (msg: string) => {
  ElMessage({
    message: msg,
    type: 'success',
  })
}

export const elErrorMsg = (msg: string) => {
  ElMessage({
    message: msg,
    type: 'error',
  })
}
