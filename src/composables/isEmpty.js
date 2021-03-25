const isEmpty = (field, name) => {
    if (!field) {
        console.log(name)
        throw Error(name.toUpperCase() + ' is required!')
    } else {
        return field
    }
}

export default isEmpty