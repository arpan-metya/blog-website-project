const filesLength = 6
const filesSize = 5
const fileType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']

const isFilesLengthValid = (files) => {
  if (files.length > filesLength) {
    alert('more than 6 files are selected')
    return false
  }
  return true
}

const isFilesSizeValid = (files) => {
  const valid = files.map(file => (file.size / (1024 * 1024)) < filesSize ? 0 : 1)
    .reduce((x, sum) => x + sum, 0)
  if (valid) {
    alert(`${valid === 1 ? '1 file has' : valid + ' files have'} size greater than ${filesSize}MB`)
    return false
  }
  return true
}

const isFilesTypeValid = (files) => {
  const valid = files.map(file => fileType.includes(file.type) ? 0 : 1)
    .reduce((x, sum) => x + sum, 0)
  if (valid) {
    alert(`${valid === 1 ? '1 file has' : valid + ' files have'} wrong file type`)
    return false
  }
  return true
}

export { isFilesLengthValid, isFilesSizeValid, isFilesTypeValid }