// "use client";
// import { createSlice } from "@reduxjs/toolkit";
// const addresourcesSlice = createSlice({
//   name: "addResource",
//   initialState: {
//     id: [],
//     // UIUXDeveloper: [],
//     // FrontEndDeveloper: [],
//     // BackendDeveloper: [],
//     // SRE: [],
//     // DevOpsEngineer: [],
//     // AutomationTester: [],
//     // ProjectManager: [],
//     // UXDesigner: [],
//     // UIDeveloper: [],
//     // APIDeveloper: [],
//     Tester: [],
//     // UXResearcher: [],
//     // CICDSpecialist: [],
//   },

//   reducers: {
//     // addResources: (state, action) => {
//     //   state.Tester.push(action.payload.id); // Pushing the payload ID to the id array
//     // //   state.Tester = action.payload.Tester;
//     //   console.log(action.payload.Tester) // Updating the Tester array with the payload Tester data
//     // },
//     addResources: (state, action) => {
//       const { id } = action.payload;
//       // Check if the id already exists in the array

//       state.Tester.push(id);

//       console.log(action.payload);
//     },

//     removeResources: (state, action) => {
//       // Removing the specified ID from the id array
//       state.id = state.id.filter((id) => id !== action.payload.id);
//       // Clearing the Tester array
//       state.Tester = [];
//       console.log(action.payload.Tester);
//     },
//   },
// });

// export const { addResources, removeResources } = addresourcesSlice.actions;
// export default addresourcesSlice.reducer;

"use client";
import { createSlice, current } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";
const addresourcesSlice = createSlice({
  name: "addResource",
  initialState: {
    id: [
      {
        prjectId: isBrowser
          ? JSON.parse(localStorage.getItem("ProjectId")) || []
          : [],
        resourcesId: [],
        workFlowId: isBrowser
          ? JSON.parse(localStorage.getItem("workFlowId")) || []
          : [],
      },
    ],

    resoucesInfo: [],
    "UIUXDeveloper": [],
    "FrontEndDeveloper": [],
    "BackendDeveloper": [],
    "SRE": [],
    "DevOpsEngineer": [],
    "AutomationTester": [],
    "ProjectManager": [],
    "ProjectManagerLength": "",
    "UXDesigner": [],
    "UxDesignerLength": "",
    "UIDeveloper": [],
    "UIDeveloperLength": "",
    "APIDeveloper": [],
    "APIDeveloperLength": "",
    "Tester": [],
    "TesterLength": "",
    "UXResearcher": [],
    "UXResearcherLength": "",
    "CICDSpecialist": [],
    "CICDSpecialistLength": "",
  },

  reducers: {
    addResources: (state, action) => {
      const newData = action.payload;
      if (newData.isChecked === true) {
        state.id[0].resourcesId.push({ id: newData.id });
      } else if (newData.isChecked === false) {
        state.id[0].resourcesId = state.id[0].resourcesId.filter(item => item.id !== newData.id);
      }
    },
    addProjectId: (state, action) => {
      state.id[0].prjectId = action.payload;
      console.log(action.payload);

      let setProjectId = JSON.stringify(state.id[0].prjectId);
      localStorage.setItem("ProjectId", setProjectId);
    },
    addWorkFlowId: (state, action) => {
      state.id[0].workFlowId = action.payload;
      console.log("workFlowData: ", action.payload);

      let setWorkFlowId = JSON.stringify(state.id[0].workFlowId);
      localStorage.setItem("workFlowId", setWorkFlowId);
    },
    addResourcesData: (state, action) => {
      const newData = action.payload;
      if (newData.isChecked === true) {
        state.resoucesInfo.push(newData);
      } else if (newData.isChecked === false) {
        state.resoucesInfo = state.resoucesInfo.filter(item => item.id !== newData.id);
      }
    },
    addResourcesPM: (state, action) => {
      const newData = action.payload;
      console.log("ProjectManager Data: ", newData);
      if (newData.isChecked === true) {
        state.ProjectManager.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.ProjectManager = state.ProjectManager.filter(item => item !== newData.id);
      }
    },
    addResourcesPMLength: (state, action) => {
      state.ProjectManagerLength = action.payload;
      console.log("ProjectManagerLength: ", action.payload);
    },
    addResourcesUxDesigner: (state, action) => {
      const newData = action.payload;
      console.log("UXDesigner Data: ", newData);
      if (newData.isChecked === true) {
        state.UXDesigner.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.UXDesigner = state.UXDesigner.filter(item => item !== newData.id);
      }
    },
    addResourcesUxDesignerLength: (state, action) => {
      state.UxDesignerLength = action.payload;
      console.log("UxDesignerLength: ", action.payload);
    },
    addResourcesUiDeveloper: (state, action) => {
      const newData = action.payload;
      console.log("UIDeveloper Data: ", newData);
      if (newData.isChecked === true) {
        state.UIDeveloper.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.UIDeveloper = state.UIDeveloper.filter(item => item !== newData.id);
      }
    },
    addResourcesUiDeveloperLength: (state, action) => {
      state.UIDeveloperLength = action.payload;
      console.log("UIDeveloperLength: ", action.payload);
    },
    addResourcesApiDeveloper: (state, action) => {
      const newData = action.payload;
      console.log("APIDeveloper Data: ", newData);
      if (newData.isChecked === true) {
        state.APIDeveloper.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.APIDeveloper = state.APIDeveloper.filter(item => item !== newData.id);
      }
    },
    addResourcesApiDeveLength: (state, action) => {
      state.APIDeveloperLength = action.payload;
      console.log("APIDeveloperLength: ", action.payload);
    },
    addResourcesTester: (state, action) => {
      const newData = action.payload;
      console.log("Tester Data: ", newData);
      if (newData.isChecked === true) {
        state.Tester.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.Tester = state.Tester.filter(item => item !== newData.id);
      }
    },
    addResourcesTesterLength: (state, action) => {
      state.TesterLength = action.payload;
      console.log("TesterLength: ", action.payload);
    },
    addResourcesUxResearch: (state, action) => {
      const newData = action.payload;
      console.log("UXResearcher Data: ", newData);
      if (newData.isChecked === true) {
        state.UXResearcher.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.UXDesigner = state.UXResearcher.filter(item => item !== newData.id);
      }
    },
    addResourcesUxResearcherLength: (state, action) => {
      state.UXResearcherLength = action.payload;
      console.log("UXResearcherLength: ", action.payload);
    },
    addResourcesCiCd: (state, action) => {
      const newData = action.payload;
      console.log("CICDSpecialist Data: ", newData);
      if (newData.isChecked === true) {
        state.CICDSpecialist.push(newData.id); // Push only the ID
      } else if (newData.isChecked === false) {
        state.CICDSpecialist = state.CICDSpecialist.filter(item => item !== newData.id);
      }
    },
    addResourcesCiCdLength: (state, action) => {
      state.CICDSpecialistLength = action.payload;
      console.log("CICDSpecialistLength: ", action.payload);
    },
    // console.log(action.title)
    removeResources: (state, action) => {
      state.resoucesInfo = state.resoucesInfo.filter(resource => resource.id !== action.payload);
      const removedEmployeeId = action.payload;

      state.ProjectManager = state.ProjectManager.filter(employeeId => employeeId !== removedEmployeeId.toString());
      state.UXDesigner = state.UXDesigner.filter(employeeId => employeeId !== removedEmployeeId.toString());
      state.UIDeveloper = state.UIDeveloper.filter(employeeId => employeeId !== removedEmployeeId.toString());
      state.APIDeveloper = state.APIDeveloper.filter(employeeId => employeeId !== removedEmployeeId.toString());
      state.Tester = state.Tester.filter(employeeId => employeeId !== removedEmployeeId.toString());
      state.UXResearcher = state.UXResearcher.filter(employeeId => employeeId !== removedEmployeeId.toString());
      state.CICDSpecialist = state.CICDSpecialist.filter(employeeId => employeeId !== removedEmployeeId.toString());


      console.log("Removed employee ID:", removedEmployeeId);
    },
    removeResourcesInfo: (state, action) => {
      state.resoucesInfo = action.payload;
      state.id[0].resourcesId = [];
      state.ProjectManager = action.payload
      state.UXDesigner = action.payload
      state.UIDeveloper = action.payload
      state.APIDeveloper = action.payload
      state.Tester = action.payload
      state.UXResearcher = action.payload
      state.CICDSpecialist = action.payload
    },
  },
});

export const {
  addResources,
  removeResources,
  addProjectId,
  addWorkFlowId,
  addResourcesData,
  addResourcesPM,
  addResourcesUxDesigner,
  addResourcesUiDeveloper,
  addResourcesApiDeveloper,
  addResourcesTester,
  addResourcesUxResearch,
  addResourcesCiCd,
  //Lengths-----------
  addResourcesPMLength,
  addResourcesUxDesignerLength,
  addResourcesUiDeveloperLength,
  addResourcesApiDeveLength,
  addResourcesTesterLength,
  addResourcesUxResearcherLength,
  addResourcesCiCdLength,
  removeResourcesInfo,
} = addresourcesSlice.actions;
export default addresourcesSlice.reducer;

// -----

// "use client";
// import { createSlice } from "@reduxjs/toolkit";
// const addresourcesSlice = createSlice({
//   name: "addResource",
//   initialState: {
//     id: [{ prjectId: {}, workFlowId:{}, }],
//     resoucesInfo: [],
//     UIUXDeveloper: [{ resoucesInfo: {} }],
//     FrontEndDeveloper: [{ resoucesInfo: {} }],
//     BackendDeveloper: [{ resoucesInfo: {} }],
//     SRE: [{ resoucesInfo: {} }],
//     DevOpsEngineer: [{ resoucesInfo: {} }],
//     AutomationTester: [{ resoucesInfo: {} }],
//     ProjectManager: [{ resoucesInfo: {} }],
//     UXDesigner: [{ resoucesInfo: {} }],
//     UIDeveloper: [{ resoucesInfo: {} }],
//     APIDeveloper: [{ resoucesInfo: {} }],
//     Tester: [],
//     UXResearcher: [{ resoucesInfo: {} }],
//     CICDSpecialist: [{ resoucesInfo: {} }],
//   },

//   reducers: {
//     addResources: (state, action) => {
//       state.id.push(action.payload);
//       console.log(action.payload);
//     },

//     addProjectId: (state, action) => {
//       state.id[0].prjectId = action.payload;
//       console.log(action.payload);
//     },
//     addWorkFlowId: (state, action) => {
//       state.id[0].workFlowId = action.payload;
//       console.log("workFlowData: ",action.payload);
//     },
//     addResourcesData: (state, action) => {
//       state.resoucesInfo.push(action.payload);
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesPM: (state, action) => {
//       state.ProjectManager[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesUxDesigner: (state, action) => {
//       state.UXDesigner[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesUiDeveloper: (state, action) => {
//       state.UIDeveloper[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesApiDeveloper: (state, action) => {
//       state.APIDeveloper[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesTester: (state, action) => {
//       state.Tester[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesUxResearch: (state, action) => {
//       state.UXResearcher[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     addResourcesCiCd: (state, action) => {
//       state.CICDSpecialist[0].resoucesInfo = action.payload;
//       console.log("resources Data: ", action.payload);
//     },
//     // console.log(action.title)
//     removeResources(state, action) {
//       return state.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const {
//   addResources,
//   removeResources,
//   addProjectId,
//   addWorkFlowId,
//   addResourcesData,
//   addResourcesPM,
//   addResourcesUxDesigner,
//   addResourcesUiDeveloper,
//   addResourcesApiDeveloper,
//   addResourcesTester,
//   addResourcesUxResearch,
//   addResourcesCiCd,
// } = addresourcesSlice.actions;
// export default addresourcesSlice.reducer;


// { name: Manager.resource_name, email: Manager.email, image :Manager.image }