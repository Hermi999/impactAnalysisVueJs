ia.QUESTION_VERSION = "1.0";
ia.no_aspice_project = "No Aspice project is effected do you want to handle the issue according to 'Requirements Based Development' anyhow?";
ia.please_choose = "Please choose...";
ia.no_prio_yet = "This element has no Priority assigned yet and is therefore not part of the BMW specifc system architecture. Please contact the system architects (Gruppenuser_GS_SysArch.CCB@at.bosch.com).";
ia.initial_displayed_qs = 5;
ia.effort_estimation = {
	sysecu: "- (Impact) Analysis of requirement\n\
- Creation / update of a system requirements specification and verification criteria\n\
- Internal and external review of system requirements specification\n\
- Creation / update of system architectural design (functional and/or dynamic view)\n\
- Internal review of system architectural design\n\
- Coordination and clarification of requirements and implementation between all effected ams\n\
- Creation and internal review of ECU system test specification\n\
- Execution of ECU system test",
	syssf: "- Creation / update of a system function (SF) requirements specification and verification criteria\n\
- Internal and external review of system function (SF) requirements specification\n\
- Clarification with Hardware department\n\
- Creation / update of system function architectural design (System Architect: functional view, dynamic ew, technical view)\n\
- Internal review of system architectural design\n\
- Coordination and clarification of requirements and implementation with function developers\n\
- Creation and internal review of SFT specification\n\
- Execution of SFT",
	sw: "- Creation / update of software requirements specification and verification criteria\n\
- Internal and external review of software requirements specification\n\
- Creation and review of software architectural design",
	swdesign: "- Implementation and Review\n\
- BC integration\n\
- Creation and review of unit reference test (URT) specification\n\
- Execution of URT\n\
- Update of SW documentation",
	cbd: "- (Impact) analysis of requirements\n\
- Creation and review of the specification\n\
- Coordination and clarification of requirements between customer and effected teams\n\
- Creation and review of software architectural design\n\
- Implementation and Review\n\
- Execution of static and dynamic unit, system and integration tests"
};
ia.modal = {
  title: "Actions to do",
};
ia.initial_questions = {
  type: "initial",
  q1:{
    type: "Requirements Allocation",
    title: "Q1",
    question: "Does the issue result in different ECU requirements specifications for the planned ASPICE (Bx8TÜ[2], Bx7TÜ2) projects?",
    howto: "Analyse if there is a major difference in the specification for the effected ASPICE projects.",
    risks: "This question is relevant for issue allocation.",
    examples: "The requirement is heavily different between Diesel and Gasoline and Bx7TÜ2 and also Bx8TÜ2 are effected.",
    actions: "If yes: You do not need to work requirements based, because it is not yet possible to handle multiproject requirements specification properly.",
    answers: {
      a1: {
        title: "Yes",
        todo: "You do <b>not</b> need to work requirements based, because it is not yet possible to handle multiproject requirements specification properly.",
        actions: {
          initial: [],
          sf: [],
          infra: [],
        },
      },
      a2: {
        title: "No",
        todo: "Please proceed with the questions.",
        actions: {
          initial: [],
          sf: [],
          infra: [],
        },
      },
    },
    //variable: true,
  },
  q2:{
    type: "Requirements Allocation",
    title: "Q2",
    question: "Does the requirement implement, change or extend a feature from the feature list?",
    howto: "Open the feature list and check if the requirement implements, changes or extends one of the entries in the list. This can be done by checking the 'Lastenheft' (L1) or the 'Pflichtenheft' (L2) in Doors",
    risks: "This question is relevant for issue allocation.",
    examples: "Add an additional state 'idle mode' to the feature x (which is on the <a href='#' onclick='ia.code.showFeatureList()'>feature list</a>) for handling specific actions during idle mode of the engine.",
    actions: "If yes: Requirements based engineering mandatory. You need to write a L2 requirement. Also document which feature is effected in the comment.<br>If no: Please proceed with the questions.",
    answers: {
      function: "ia.code.showFeatureList('featureList-modal', 'featureList-search');",
      name: "feature",
      function_trigger: "Open Feature list",
      alternative_value: "None",
      actions: {
        initial: [], 
        sf: [],
        infra: [],
      },
    },
    //variable: true,
  },
  q3:{
    type: "Requirements Allocation",
    title: "Q3",
    question: "Does the requirement only change the SW implementation details (no functional changes)?",
    howto: "Evaluate if the requirement only effects the change of the software design.",
    risks: "This questions is only releveant for issue allocation.",
    examples: "Code refactoring, fixing SW-Build warnings, using other API interfaces, renaming of local variables",
    actions: "This questions is only releveant for issue allocation.",
    answers: {
      a1: {
        title: "Yes",
        todo: "Proceed with the further questions.",
        actions: {
          initial: [],
          sf: [],
          infra: [],
        },
      },
      a2: {
        title: "No",
        todo: "Proceed with the further questions.",
        actions: {
          initial: [],
          sf: [],
          infra: [],
        },
      },
    },
    //variable: true,
  },
  q4:{
    type: "Requirements Allocation",
    title: "Q4",
    question: "Which system elements are changed by this requirement?",
    howto: "Select all system elements which need to be changed from the PTSA-list.<br> \
        DO NOT select system elements which are ony used as infrastructure units. Those will be addressed with the next question.\
        <br><br>\
        <b>*Infrastructure unit:</b> <br>Usage of a system element by another system element to fulfill a standard task. <br><b>Examples:</b>\
        <ul><li>If you need a new standard tester job or you need a new/changed CAN/LIN/FlexRay frame, then ComDia/ComVeh are used as infrastructure unit.</li>\
        <li>If you need an interface to SW-Sharing objects, then the SW-Sharing part is used as infrastructure unit.</li>\
        <li>However, if you need to implement a change in the CAN-Driver or you need to implement a new diagnosis standard, then the ComVeh/ComDia implementation needs a requirements specification and is NOT used as infrastructure unit.</li>\
        </ul>",
    risks: "No all affected system elements are identified.",
    examples: "-",
    actions: "You need to perform an 'system unit' impact analysis for all the selected system elements.",
    answers: {
      function: "ia.code.showSysElList('ptsa-modal', 'ptsa-search');",
      name: "sf",
      function_trigger: "Open PTSA list (Strg+b)",
      alternative_value: "None",
      actions: {
        initial: [], 
        sf: [],
        infra: [],
      },
    },
    //variable: true,
  },
  q5:{
    type: "System Impact Analysis",
    title: "Q5",
    question: "Which system elements are used as infrastructure units?",
    howto: "Select all system elements from the Infrastructure list which \
        are only used as infrastructure units.<br> Infrastructure units are system elements which can be used by other system elements to implement a certain functionality. <br><b>Examples:</b> <ul>\
        <li>If you need a new standard tester job or you need a new/changed CAN/LIN/FlexRay frame, then ComDia/ComVeh are used as infrastructure unit.</li>\
        <li>If you need an interface to SW-Sharing objects, then the SW-Sharing part is used as infrastructure unit.</li>\
        <li>If you need to implement a change in the CAN-Driver or you need to implement a new diagnosis standard, then the ComVeh/ComDia implementation needs a requirements specification and is NOT used as infrastructure unit.</li>\
        </ul>",
    risks: "None. This question is only relevant for Issue Allocation.",
    examples: "ComDia, Sw-Sharing, DSM, ComVeh, BSW, EEPROM, DELib",
    actions: "You need to perform an 'infrastructure unit' impact analysis for all the selected infrastructure units.",
    answers: {
      function: "ia.code.showSysElList('infra-modal', 'infra-search');",
      name: "infra",
      function_trigger: "Open Infrastructure list (Strg+d)",
      alternative_value: "None",
      actions: {
        initial: [], 
        sf: [],
        infra: [],
      },
    },
    //variable: true,
  },
  
  q6:{
    type: "Change Based Development Questions",
    title: "Q6",
    question: "Does the requirement imply potential non-compliance steps/implementation according to the <a href='https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Activity&elementName=Customer%20Engineering%7CAA%20Codex%20Software%20Compliance&projectName=Root%7CLibs%7CEngine%20ECU%7CDGS-EC%20SW%20and%20Calibration%20Product%20Development'>Codex SW Compliance</a>?",
    risks: "The concept/implementation will violate the compliance rules of Bosch.",
    examples: "Detailed information can be found in <a href='https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Standard&elementName=Codex%20Software%20Compliance&projectName=Root%7CLibs%7CEngine%20ECU%7CDGS-EC%20SW%20and%20Calibration%20Product%20Development'>P-Lib View Codex Software Compliance</a>",
    actions: "<b>If yes:</b> Stop development, proceed according to P-Lib Workinstruction: AA Codex Software Compliance",
    answers: {
      a1: {
        title: "Evaluated",
        todo: "<b>If yes:</b> Stop development, proceed according to P-Lib Workinstruction: AA Codex Software Compliance",
      },
    },
    variable: true,
  },
  q7:{
    type: "Change Based Development Questions",
    title: "Q7",
    question: "Does the requirement imply a potential risk according to QCD: Quality, cost or delivery date?",
    risks: "QCD riscs are not identified and handled early enough, which leads to costs or customer dissatisfaction.",
    examples: "<ul>\
    <li>The change implies a huge amount of effort</li>\
    <li>It is not clarified if the change is a bug or feature</li>\
    <li>The change impacts many different parts of the ECU</li>\
    <li>Potential side effects can not be identified</li>\
    <li>The team is under very high work load and delivery dates are in danger</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the risk to the project manager</li>\
    <li>Attach the communication record (e.g. email) to the issue SW.</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Communicate the risk to the project manager</li>\
        <li>Attach the communication record (e.g. email) to the issue SW.</li></ul>",
      },
    },
    variable: true,
  },
  q8:{
    type: "Change Based Development Questions",
    title: "Q8",
    question: "Does the requirement affect the handling of the ECU at<ul>\
    <li>Production Process at RB plant</li>\
    <li>Vehicle integration</li>\
    <li>Garage and after sales handling</li>\
    <li>Production at customer plant</li></ul>",
    risks: "Potential problems at the plants or garages are not identified.",
    examples: "A requirement leads to a change in the factory assembly of the vehicle (assemble mode).",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the risk to project manager and other stakeholders (customer)</li>\
    <li>Set 'Production Relevance' tag in Issue SW planning tab to 'required'</li>\
    <li>Check if system integration tests need to be updated</li>\
    <li>Upload all clarifications to RQ1</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Communicate the risk to project manager and other stakeholders (customer)</li>\
        <li>Set 'Production Relevance' tag in Issue SW planning tab to 'required'</li>\
        <li>Check if system integration tests need to be updated</li>\
        <li>Upload all clarifications to RQ1</li></ul>",
      },
    },
    variable: true,
  },
  q9:{
    type: "Change Based Development Questions",
    title: "Q9",
    question: "Does the requirement affect <b>external components</b> and/or <b>external interfaces</b>?",
    risks: "The solution concept will require changes in the environment of the ECU which are not communicated to the responsible teams.<br><br>Risc of no testability because of missing test system modifications.",
    examples: "<ul><li>The change demands activation of starter by FlexRay bus instead of ECU HW pin. Risk is that starter is not activated due to wrong system configuration.</li>\
    <li>The change requires an update of the CAN matrix. Risk is that other components are not adapted to the new protocol.</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Contact the responsible person for the external component (either the 'system engineer customer' (GS/ESC1) in case of Bosch component or the responsible BMW person)</li>\
    <li>Communicate the risk to the ECU project manager</li>\
    <li>Attach the communication record (e.g. email) to the issue SW</li>\
    <li>Check together with the System Architect if HSI and/or system integration tests have to be updated</li>\
    <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Contact the responsible person for the external component (either the 'system engineer customer' (GS/ESC1) in case of Bosch component or the responsible BMW person)</li>\
        <li>Communicate the risk to the ECU project manager</li>\
        <li>Attach the communication record (e.g. email) to the issue SW</li>\
        <li>Check together with the System Architect if HSI and/or system integration tests have to be updated</li>\
        <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li></ul>",
      },
    },
    variable: true,
  },
  q10:{
    type: "Change Based Development Questions",
    title: "Q10",
    question: "Does the requirement impact <b>domains</b> which require to be informed very early (e.g. due to long preparation need)?",
    risks: "- Development is delayed because the needed resources cannot be supplied in time<br>- Needed tasks from other teams for fulfilling the CRQ are not triggered",
    examples: "<ul><li>required HW changes</li>\
    <li>concept development</li>\
    <li>new or changed diagnosis tester needs new interface in the test system</li>\
    <li>new or changed software licences for new software tools</li>\
    <li>new or changed test models for closed loop systems</li>\
    <li>new or changed development or management processes</li>",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the Risk to the ECU project manager</li>\
    <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li>\
    <li>Upload all clarifications to RQ1</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "'<ul>\
        <li>Communicate the Risk to the ECU project manager</li>\
        <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li>\
        <li>Upload all clarifications to RQ1</li></ul>",
      },
    },
    variable: true,
  },
  q11:{
    type: "Change Based Development Questions",
    title: "Q11",
    question: "Does the requirement require an implementation/solution which may have an unexpected or unwanted <b>side effect</b> on the behavior of the ECU itself or its connected devices?",
    risks: "The solution concept will have side effects on the behavior of the ECU or its connected devices, and these side effects are not completely understood and agreed by the stakeholder/customer.",
    examples: "<ul><li>change of PWM frequency / PWM frequency setpoint may have impact on EMV and results in exceeding electromagnetic interference limits</li> \
        <li>change of frequency of inductor current may have an impact on inductor noise and results in unwanted mechanical noise</li>\
        <li>change of injection time may have an impact on temperature of power stages and results in exceeding ECU maximum operating temperature</li>\
        <li>change of actuator control may have impact on power supply capacity during reset, flash programming, wakeup, pre-/post drive, … and results in drop of power supply</li>\
        <li>change of frequency of EEPROM access leads to reduced ECU lifetime</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Organize and conduct an analysis on the potential impact and verify with the responsible stakeholder (HW project manager, customer) that expected limits and behavior can be met. If this cannot be achieved change or refuse the requirement.</li>\
    <li>Consider the execution of a DRBFM.</li>\
    <li>Communicate the risk to the system architect and project manager</li>\
    <li>Upload all clarifications to RQ1</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Organize and conduct an analysis on the potential impact and verify with the responsible stakeholder (HW project manager, customer) that expected limits and behavior can be met. If this cannot be achieved change or refuse the requirement.</li>\
        <li>Consider the execution of a DRBFM.</li>\
        <li>Communicate the risk to the system architect and project manager</li>\
        <li>Upload all clarifications to RQ1</li></ul>",
      },
    },
    variable: true,
  },
  q12:{
    type: "Change Based Development Questions",
    title: "Q12",
    question: "Does the requirement affect already existing <b>calibration labels or values</b>?",
    risks: "The calibration engineer creates a wrong application due to a change in SW.",
    examples: "<ul><li>A software update changes the names of calibration parameters</li>\
    <li>A calibration parameter is replaced by another parameter</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Create/update an application hint in the documentation</li>\
    <li>Create/update a System Specific Data in the SF specification (Diesel only)</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Create/update an application hint in the documentation</li>\
        <li>Create/update a System Specific Data in the SF specification (Diesel only)</li></ul>",
      },
    },
    variable: true,
  },
  q13:{
    type: "Change Based Development Questions",
    title: "Q13",
    question: "Does the requirement affects/adds/changes the storage of data in a <b>non-volatile memory (e.g. EEPROM)</b>?",
    risks: "<ul><li>Data corruption & data loss (eg. Missalignment of data within EEP-Block; Complete data loss of EEP-Block)</li>\
    <li>MIL relevant DFC might be activated.</li></ul>",
    examples: "<ul><li>change in array length of NV variables</li>\
    <li>insertion or deletion of a block element</li>\
    <li>change of block name or length</li></ul>",
    actions: "<b>If yes:</b><br>Contact EEPROM Department Responsibles BMW during the design phase.<br><br>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "Contact EEPROM Department Responsibles BMW during the design phase.",
      }
    },
    variable: true,
  },
  q14:{
    type: "Change Based Development Questions",
    title: "Q14",
    question: "Does the requirement impact diagnosis functions related to <b>On-board diagnostics (OBD)-regulations</b> and especially <b>In Use Monitoring Performance Ratio (IUMPR)</b>?",
    risks: "If OBD regulations are not met, fees may need to be paid for any vehicle sold, resulting in major financial claims to RB",
    examples: "-",
    actions: "<b>If yes:</b><br>Ensure, the requirement fulfills the regulations and contact the department OBD responsible in case of need for support.",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "Ensure, the requirement fulfills the regulations and contact the department OBD responsible in case of need for support.",
      },
    },
  },
  q15:{
    type: "Change Based Development Questions",
    title: "Q15",
    question: "Does the requirement necessitate the modification of the <b>existing test environment</b>. If yes, which one needs to be modified (Hardware in the Loop - HiL, wiring harness, vehicle, etc.)?",
    risks: "Problems with the test environment are detected too shortly before Software delivery. This can lead to a postponement of the requirement or the whole Software delivery.",
    examples: "<ul>\
    <li>an update of the 'Nachrichtenkatalog' is required</li>\
    <li>a certain vehicle with a specific I-Step is required</li>\
    <li>a certain hardware component is required</li>\
    <li>Sophisticated test and measurement devices are needed</li>\
    <li>an ETK-ECU is required</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Contact the project / test bench / test model responsible (<a href='mailto: DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com'>DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com</a>)</li>\
    <li>If requirement can't be fully tested at Bosch, then contact the customer to discuss further test strategy.</li>\
    <li>Document special needs for this requirement in the 'Verification Criteria' in Doors</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Contact the project / test bench / test model responsible (<a href='mailto: DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com'>DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com</a>)</li>\
        <li>If requirement can't be fully tested at Bosch, then contact the customer to discuss further test strategy.</li>\
        <li>Document special needs for this requirement in the 'Verification Criteria' in Doors</li></ul>",
      },
    },
    variable: true,
  },
};

ia.sf_questions = {
  type: "sf",
  q1:{
    type: "General",
    title: "Q1",
    question: "Does the requirement imply potential non-compliance steps/implementation according to the <a href='https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Activity&elementName=Customer%20Engineering%7CAA%20Codex%20Software%20Compliance&projectName=Root%7CLibs%7CEngine%20ECU%7CDGS-EC%20SW%20and%20Calibration%20Product%20Development'>Codex SW Compliance</a>?",
    risks: "The concept/implementation will violate the compliance rules of Bosch.",
    examples: "Detailed information can be found in <a href='https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Standard&elementName=Codex%20Software%20Compliance&projectName=Root%7CLibs%7CEngine%20ECU%7CDGS-EC%20SW%20and%20Calibration%20Product%20Development'>P-Lib View Codex Software Compliance</a>",
    actions: "<b>If yes:</b> Stop development, proceed according to P-Lib Workinstruction: AA Codex Software Compliance",
    answers: {
      a1: {
        title: "Evaluated",
        todo: "<b>If yes:</b> Stop development, proceed according to P-Lib Workinstruction: AA Codex Software Compliance",
      },
    },
  },
  q2:{
    type: "General",
    title: "Q2",
    question: "Does the requirement imply a potential risk according to QCD: Quality, cost or delivery date?",
    risks: "QCD riscs are not identified and handled early enough, which leads to costs or customer dissatisfaction.",
    examples: "<ul>\
    <li>The change implies a huge amount of effort</li>\
    <li>It is not clarified if the change is a bug or feature</li>\
    <li>The change impacts many different parts of the ECU</li>\
    <li>Potential side effects can not be identified</li>\
    <li>The team is under very high work load and delivery dates are in danger</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the risk to the project manager</li>\
    <li>Attach the communication record (e.g. email) to the issue SW.</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Communicate the risk to the project manager</li>\
        <li>Attach the communication record (e.g. email) to the issue SW.</li></ul>",
      },
    },
  },
  q3:{
    type: "External Impact (*all questions also include used infrastructure elements)",
    title: "Q3",
    question: "Does the requirement affect the handling of the ECU at<ul>\
    <li>Production Process at RB plant</li>\
    <li>Vehicle integration</li>\
    <li>Garage and after sales handling</li>\
    <li>Production at customer plant</li></ul>",
    risks: "Potential problems at the plants or garages are not identified.",
    examples: "A requirement leads to a change in the factory assembly of the vehicle (assemble mode).",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the risk to project manager and other stakeholders (customer)</li>\
    <li>Set 'Production Relevance' tag in Issue SW planning tab to 'required'</li>\
    <li>Check if system integration tests need to be updated</li>\
    <li>Upload all clarifications to RQ1</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Communicate the risk to project manager and other stakeholders (customer)</li>\
        <li>Set 'Production Relevance' tag in Issue SW planning tab to 'required'</li>\
        <li>Check if system integration tests need to be updated</li>\
        <li>Upload all clarifications to RQ1</li></ul>",
      },
    },
  },
  q4:{
    type: "External Impact (*all questions also include used infrastructure elements)",
    title: "Q4",
    question: "Does the requirement affect <b>external components</b> and/or <b>external interfaces</b>?",
    risks: "The solution concept will require changes in the environment of the ECU which are not communicated to the responsible teams.<br><br>Risc of no testability because of missing test system modifications.",
    examples: "<ul>\
    <li>The change demands activation of starter by FlexRay bus instead of ECU HW pin. Risk is that starter is not activated due to wrong system configuration.</li>\
    <li>The requirement demands the implementation of a new clutch pedal position acquisition function: change in the project specific HSI is required.</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Contact the responsible person for the external component (either the 'system engineer customer' (GS/ESC1) in case of Bosch component or the responsible BMW person)</li>\
    <li>Communicate the risk to the ECU project manager</li>\
    <li>Attach the communication record (e.g. email) to the issue SW</li>\
    <li>Check together with the System Architect if HSI and/or system integration tests have to be updated</li>\
    <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Communicate the risk to the ECU project manager</li>\
        <li>Attach the communication record (e.g. email) to the issue SW</li>\
        <li>Check together with the System Architect if HSI and/or system integration tests have to be updated</li>\
        <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li>\
        <li>Contact the responsible person for the external component (either the 'system engineer customer' (GS/ESC1) in case of Bosch component or the responsible BMW person)</li></ul>",
      },
    },
  },
  q5:{
    type: "Internal Impact (*all questions also include used infrastructure elements)",
    title: "Q5",
    question: "Does the requirement impact <b>domains</b> which require to be informed very early (e.g. due to long preparation need)?",
    risks: "- Development is delayed because the needed resources cannot be supplied in time<br>- Needed tasks from other teams for fulfilling the CRQ are not triggered",
    examples: "<ul><li>required HW changes</li>\
    <li>concept development</li>\
    <li>new or changed diagnosis tester needs new interface in the test system</li>\
    <li>new or changed software licences for new software tools</li>\
    <li>new or changed test models for closed loop systems</li>\
    <li>new or changed development or management processes</li>",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the Risk to the ECU project manager</li>\
    <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li>\
    <li>Upload all clarifications to RQ1</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "'<ul>\
        <li>Communicate the Risk to the ECU project manager</li>\
        <li>Document the link to the external task in RQ1 (workitem or link in 'internal comment' field)</li>\
        <li>Upload all clarifications to RQ1</li></ul>",
      },
    },
  },
  q6:{
    type: "Internal Impact (*all questions also include used infrastructure elements)",
    title: "Q6",
    question: "Does the requirement require an implementation/solution which may have an unexpected or unwanted <b>side effect</b> on the behavior of the ECU itself or its connected devices?",
    risks: "The solution concept will have side effects on the behavior of the ECU or its connected devices, and these side effects are not completely understood and agreed by the stakeholder/customer.",
    examples: "<ul><li>change of PWM frequency / PWM frequency setpoint may have impact on EMV and results in exceeding electromagnetic interference limits</li> \
        <li>change of frequency of inductor current may have an impact on inductor noise and results in unwanted mechanical noise</li>\
        <li>change of injection time may have an impact on temperature of power stages and results in exceeding ECU maximum operating temperature</li>\
        <li>change of actuator control may have impact on power supply capacity during reset, flash programming, wakeup, pre-/post drive, … and results in drop of power supply</li>\
        <li>change of frequency of EEPROM access leads to reduced ECU lifetime</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Organize and conduct an analysis on the potential impact and verify with the responsible stakeholder (HW project manager, customer) that expected limits and behavior can be met. If this cannot be achieved change or refuse the requirement.</li>\
    <li>Consider the execution of a DRBFM.</li>\
    <li>Communicate the risk to the system architect and project manager</li>\
    <li>Upload all clarifications to RQ1</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Organize and conduct an analysis on the potential impact and verify with the responsible stakeholder (HW project manager, customer) that expected limits and behavior can be met. If this cannot be achieved change or refuse the requirement.</li>\
        <li>Consider the execution of a DRBFM.</li>\
        <li>Communicate the risk to the system architect and project manager</li>\
        <li>Upload all clarifications to RQ1</li></ul>",
      },
    },
  },
  q7:{
    type: "Internal Impact (*all questions also include used infrastructure elements)",
    title: "Q7",
    question: "Does the requirement affect already existing <b>calibration labels or values</b>?",
    risks: "The calibration engineer creates a wrong application due to a change in SW.",
    examples: "<ul><li>A software update changes the names of calibration parameters</li>\
    <li>A calibration parameter is replaced by another parameter</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Create/update an application hint in the documentation</li>\
    <li>Create/update a System Specific Data in the SF specification (Diesel only)</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Create/update an application hint in the documentation</li>\
        <li>Create/update a System Specific Data in the SF specification (Diesel only)</li></ul>",
      },
    },
  },
  q8:{
    type: "Internal Impact (*all questions also include used infrastructure elements)",
    title: "Q8",
    question: "Does the requirement affects/adds/changes the storage of data in a <b>non-volatile memory (e.g. EEPROM)</b>?",
    risks: "<ul><li>Data corruption & data loss (eg. Missalignment of data within EEP-Block; Complete data loss of EEP-Block)</li>\
    <li>MIL relevant DFC might be activated.</li></ul>",
    examples: "<ul><li>change in array length of NV variables</li>\
    <li>insertion or deletion of a block element</li>\
    <li>change of block name or length</li></ul>",
    actions: "<b>If yes:</b><br>Contact EEPROM Department Responsibles BMW during the design phase.<br><br>\
    <b>If Unknown:</b><br>Contact the functions developers to give feedback to EDRs when changes are required in the design phase. Accordingly, add a hint to IssueFD description field.",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "Contact EEPROM Department Responsibles BMW during the design phase.",
      },
      a3:{
        title: "Unknown",
        todo: "Contact the functions developers to give feedback to EDRs when changes are required in the design phase. Accordingly, add a hint to IssueFD description field."
      }
    },
  },
  q9:{
    type: "Internal Impact (*all questions also include used infrastructure elements)",
    title: "Q9",
    question: "Does the requirement impact diagnosis functions related to <b>On-board diagnostics (OBD)-regulations</b> and especially <b>In Use Monitoring Performance Ratio (IUMPR)</b>?",
    risks: "If OBD regulations are not met, fees may need to be paid for any vehicle sold, resulting in major financial claims to RB",
    examples: "-",
    actions: "<b>If yes:</b><br>Ensure, the requirement fulfills the regulations and contact the department OBD responsible in case of need for support.",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "Ensure, the requirement fulfills the regulations and contact the department OBD responsible in case of need for support.",
      },
    },
  },
  q10:{
    type: "Internal Impact (*all questions also include used infrastructure elements)",
    title: "Q10",
    question: "Does the requirement necessitate the modification of the <b>existing test environment</b>. If yes, which one needs to be modified (Hardware in the Loop - HiL, wiring harness, vehicle, etc.)?",
    risks: "Problems with the test environment are detected too shortly before Software delivery. This can lead to a postponement of the requirement or the whole Software delivery.",
    examples: "<ul>\
    <li>an update of the 'Nachrichtenkatalog' is required</li>\
    <li>a certain vehicle with a specific I-Step is required</li>\
    <li>a certain hardware component is required</li>\
    <li>Sophisticated test and measurement devices are needed</li>\
    <li>an ETK-ECU is required</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Contact the project / test bench / test model responsible (<a href='mailto: DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com'>DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com</a>)</li>\
    <li>If requirement can't be fully tested at Bosch, then contact the customer to discuss further test strategy.</li>\
    <li>Document special needs for this requirement in the 'Verification Criteria' in Doors</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Contact the project / test bench / test model responsible (<a href='mailto: DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com'>DGS-EC_ECB7_Testinfrastruktur_Team@bosch.com</a>)</li>\
        <li>If requirement can't be fully tested at Bosch, then contact the customer to discuss further test strategy.</li>\
        <li>Document special needs for this requirement in the 'Verification Criteria' in Doors</li></ul>",
      },
    },
  },
}

ia.infra_questions = {
  type: "infra",
  q1:{
    type: "General",
    title: "Q1",
    question: "Does the requirement imply potential non-compliance steps/implementation according to the <a href='https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Activity&elementName=Customer%20Engineering%7CAA%20Codex%20Software%20Compliance&projectName=Root%7CLibs%7CEngine%20ECU%7CDGS-EC%20SW%20and%20Calibration%20Product%20Development'>Codex SW Compliance</a>?",
    risks: "The concept/implementation will violate the compliance rules of Bosch.",
    examples: "Detailed information can be found in <a href='https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Standard&elementName=Codex%20Software%20Compliance&projectName=Root%7CLibs%7CEngine%20ECU%7CDGS-EC%20SW%20and%20Calibration%20Product%20Development'>P-Lib View Codex Software Compliance</a>",
    actions: "<b>If yes:</b> Stop development, proceed according to P-Lib Workinstruction: AA Codex Software Compliance",
    answers: {
      a1: {
        title: "Evaluated",
        todo: "<b>If yes:</b> Stop development, proceed according to P-Lib Workinstruction: AA Codex Software Compliance",
      },
    },
  },
  q2:{
    type: "General",
    title: "Q2",
    question: "Does the requirement imply a potential risk according to QCD: Quality, cost or delivery date?",
    risks: "QCD riscs are not identified and handled early enough, which leads to costs or customer dissatisfaction.",
    examples: "<ul>\
    <li>The change implies a huge amount of effort</li>\
    <li>It is not clarified if the change is a bug or feature</li>\
    <li>The change impacts many different parts of the ECU</li>\
    <li>Potential side effects can not be identified</li>\
    <li>The team is under very high work load and delivery dates are in danger</li></ul>",
    actions: "<b>If yes:</b><ul>\
    <li>Communicate the risk to the project manager</li>\
    <li>Attach the communication record (e.g. email) to the issue SW.</li></ul>",
    answers: {
      a1: {
        title: "No",
        todo: "nothing to do",
      },
      a2: {
        title: "Yes",
        todo: "<ul>\
        <li>Communicate the risk to the project manager</li>\
        <li>Attach the communication record (e.g. email) to the issue SW.</li></ul>",
      },
    },
  }
}