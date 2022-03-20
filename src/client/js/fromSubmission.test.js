import { fromSubmission} from './formSubmit'

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing journeyLong correct", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
   test("Testing the journeyLong calculation", () => {
      
      const startDate = "2022-03-26";
      const endDate = "2022-03-28";

      const journeyDate = new Date(startDate);
      const endJourneyDate = new Date(endDate);
      const journeyLong = (endJourneyDate.getTime() - journeyDate.getTime()) / 86400000;

      expect(journeyLong).toBe(2);
   })
});

