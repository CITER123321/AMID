using Xunit;
using ISDR.Shared.Models;
using ISDR.Shared.Logic;
using System.IO;

namespace StationLoaderTests
{
    public class StationLoaderTest
    {
        [Fact]
        public void LoadStationFromJson_ValidJson_ReturnsStationData()
        {
            // Arrange
            string json = @"
            {
                ""id"": ""st_test"",
                ""name"": ""Test Station"",
                ""trackSegments"": [
                    { ""id"": ""t1"", ""name"": ""Track 1"", ""length"": 100.0, ""isElectrified"": true }
                ],
                ""switches"": [
                    { ""id"": ""sw1"", ""name"": ""Switch 1"", ""type"": ""zwyczajny"", ""defaultPosition"": ""plus"", ""currentPosition"": ""plus"" }
                ],
                ""signals"": [
                    { ""id"": ""sig1"", ""name"": ""Signal 1"", ""type"": ""semafor"", ""state"": ""S1"", ""isVirtual"": false }
                ]
            }";

            // Act
            var station = StationLoader.LoadStationFromJson(json);

            // Assert
            Assert.NotNull(station);
            Assert.Equal("st_test", station.id);
            Assert.Equal("Test Station", station.name);

            Assert.Single(station.trackSegments);
            Assert.Equal("t1", station.trackSegments[0].id);

            Assert.Single(station.switches);
            Assert.Equal("Switch 1", station.switches[0].name);

            Assert.Single(station.signals);
            Assert.Equal("S1", station.signals[0].state);
        }

        [Fact]
        public void LoadStationFromFile_PsaryJson_LoadsCorrectly()
        {
            // Arrange
            // Ścieżka względem folderu uruchomieniowego testu
            string path = Path.Combine("..", "..", "..", "..", "..", "Assets", "Resources", "Stations", "psary.json");

            // Act
            var station = StationLoader.LoadStationFromFile(path);

            // Assert
            Assert.NotNull(station);
            Assert.Equal("st_psary", station.id);
            Assert.Equal("Psary", station.name);
            Assert.Equal(4, station.trackSegments.Count);
            Assert.Equal(2, station.switches.Count);
            Assert.Equal(4, station.signals.Count);
        }
    }
}
