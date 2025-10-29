import { saveEmployeeOnboardDetailsService,getOnBoardEmployeeDetailsService } from "../services/onboardService.js";


// to Save onBoard Details of a employee
export const saveEmployeeOnboardDetails = async (req, res) => {
    try {
        const response = await saveEmployeeOnboardDetailsService(req.body);
        return res.status(201).json({ message: "Onboarding details saved successfully", data: response,success:true });
    } catch (error) {
        console.error("Error saving onboard details:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message,success:true });
    }
}; 

// Get Employee Details by Registration ID
export const getOnboardEmployeeDetails = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const employeeDetails = await getOnBoardEmployeeDetailsService(registrationId);

        if (!employeeDetails) {
            return res.status(404).json({ 
                message: "Employee not found", 
                success: false 
            });
        }

        return res.status(200).json({ 
            message: "Employee details fetched successfully", 
            data: employeeDetails, 
            success: true 
        });
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message, 
            success: false 
        });
    }
};

//export default {saveEmployeeOnboardDetails,getOnboardEmployeeDetails};
