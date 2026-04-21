using System.Collections.Generic;

namespace ISDR.Shared.Models
{
    [System.Serializable]
    public class StationData
    {
        public string id;
        public string name;
        public List<TrackSegment> trackSegments;
        public List<Switch> switches;
        public List<Signal> signals;

        public StationData()
        {
            trackSegments = new List<TrackSegment>();
            switches = new List<Switch>();
            signals = new List<Signal>();
        }
    }

    [System.Serializable]
    public class TrackSegment
    {
        public string id;
        public string name;
        public float length;
        public bool isElectrified;
    }

    [System.Serializable]
    public class Switch
    {
        public string id;
        public string name;
        public string type; // "rozjazd_zwyczajny", "krzyzowy" itp.
        public string defaultPosition; // "plus", "minus"
        public string currentPosition;
    }

    [System.Serializable]
    public class Signal
    {
        public string id;
        public string name;
        public string type; // "semafor", "tarcz_manewrowa", "tarcza_ostrzegawcza"
        public string state; // "S1", "S2" itp. (lub S1, Ms1 itp.)
        public bool isVirtual; // wirtualne semafory np. na szlaku
    }
}
