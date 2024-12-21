// Hook clearObjRequest is used to remove empty fields from the object.

const clearObjRequest = (obj: Record<string, unknown>) => {
  const newObj = { ...obj }

  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === '' || newObj[key] === null || newObj[key] === undefined) {
      delete newObj[key]
    }
  })

  return newObj
}

export { clearObjRequest }
