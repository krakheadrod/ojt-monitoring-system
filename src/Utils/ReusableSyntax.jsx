var MyDate = new Date()

MyDate.setMonth(MyDate.getMonth() + 1)

export const MyDateString =
  MyDate.getFullYear() +
  "-" +
  ("0" + MyDate.getMonth()).slice(-2) +
  "-" +
  ("0" + MyDate.getDate()).slice(-2)

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const sectionList = [
  "FA1-BSIT4-1",
  "FA1-BSIT4-2",
  "FA1-BSIT4-3",
  "FA1-BSIT4-4",
  "FA2-BSIT4-1",
  "FA2-BSIT4-2",
  "FA2-BSIT4-3",
  "FA2-BSIT4-4",
]

//*Convert Array Object into Object
export const objectAssign = (ObjectArray, obj) => {
  return ObjectArray.map((info) => {
    return Object.assign(obj, info)
  })
}

export const filterByOwnerIdTask = (array, id) => {
  return array.filter((el) => {
    return el.ownerUUID === id
  })
}

export const coordinatorName = (fetchCoordinator, coordEmail) => {
  return fetchCoordinator.filter((type) => {
    return type.coordEmail === coordEmail
  })
}

export const generateTaskCode = () => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()

  today = `${mm}${dd}${yyyy}`

  const newTaskCode = `T-${today}-${Math.floor(
    Math.random() * (999 - 100 + 1) + 100
  )}`

  return newTaskCode
}

export const filteredSubmission = (itemArray) => {
  return itemArray.filter((obj) => {
    return obj.taskStatus === "TASK" && obj.ownerEmail !== "demo@admin.com"
  })
}

export const filteredByStudentScore = (itemArray, uid) => {
  return itemArray.filter((elem) => {
    return elem.documentDetails.score !== 0
  })
}

export const filteredByIDSubmittedTask = (itemArray, paramsId) => {
  return itemArray.filter((type) => {
    return type?.id === paramsId
  })
}

export const filteredBySection = (itemArray, studentSection, company) => {
  return itemArray.filter((type) => {
    if (type.company) {
      return type.company === company
    } else {
      return type.section === studentSection
    }
  })
}

export const filterByStudentName = (itemArray, studentName) => {
  return itemArray.filter((type) => {
    return type.fullName === studentName
  })
}

export const filterByStudentUUID = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.id === uid
  })
}

export const filterByStudentUUIDs = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.userDetails.authId === uid
  })
}

export const filteredByEmail = (itemArray, email) => {
  return itemArray.filter((type) => {
    return type.ownerEmail === email
  })
}

export const filterCoordByUUID = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.ownerUUID === uid
  })
}

export const filterByUUID = (itemArray, email) => {
  return itemArray.filter((type) => {
    return type.coordinatorEmail === email
  })
}

export const filterByCoordinatorUUIDs = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.coordinatorUUID === uid
  })
}

export const filterByCoordinatorUUID = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.authId === uid
  })
}

export const eliminateDuplicates = (obj) => {
  return obj.filter((value, index) => {
    const _value = JSON.stringify(value)

    return (
      index ===
      obj.findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    )
  })
}

export const mergeByProperty = (target, source, prop) => {
  source.forEach((sourceElement) => {
    let targetElement = target.find((targetElement) => {
      return sourceElement[prop] === targetElement[prop]
    })
    targetElement
      ? Object.assign(targetElement, sourceElement)
      : target.push(sourceElement)
  })
}

export const isCheckSubmittedTasks = (filteredDocuments, taskName) => {
  const found = filteredDocuments.some((el) => {
    console.log(el.documentDetails.taskName, taskName)
    return el.documentDetails.taskName === taskName
  })
  return found
}
