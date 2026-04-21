using System;
using ISDR.Shared.Models;
using Newtonsoft.Json;
using System.IO;

namespace ISDR.Shared.Logic
{
    public class StationLoader
    {
        public static StationData LoadStationFromJson(string jsonContent)
        {
            if (string.IsNullOrEmpty(jsonContent))
            {
                throw new ArgumentException("JSON content cannot be null or empty", nameof(jsonContent));
            }

            try
            {
                StationData stationData = JsonConvert.DeserializeObject<StationData>(jsonContent);
                return stationData;
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to parse station JSON: {ex.Message}", ex);
            }
        }

        public static StationData LoadStationFromFile(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"Station file not found: {filePath}");
            }

            string jsonContent = File.ReadAllText(filePath);
            return LoadStationFromJson(jsonContent);
        }
    }
}
