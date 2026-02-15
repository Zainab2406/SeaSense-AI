"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingEvents = exports.SosTriggerPayload = exports.LocationUpdatePayload = void 0;
class LocationUpdatePayload {
    vesselId;
    tripId;
    latitude;
    longitude;
    speed;
    heading;
    timestamp;
}
exports.LocationUpdatePayload = LocationUpdatePayload;
class SosTriggerPayload {
    vesselId;
    tripId;
    message;
    timestamp;
}
exports.SosTriggerPayload = SosTriggerPayload;
var TrackingEvents;
(function (TrackingEvents) {
    TrackingEvents["TRIP_STARTED"] = "trip_started";
    TrackingEvents["LOCATION_UPDATE"] = "location_update";
    TrackingEvents["TRIP_ENDED"] = "trip_ended";
    TrackingEvents["SOS_TRIGGERED"] = "sos_triggered";
    TrackingEvents["VESSEL_LIVE_UPDATE"] = "vessel_live_update";
})(TrackingEvents || (exports.TrackingEvents = TrackingEvents = {}));
//# sourceMappingURL=tracking.interface.js.map