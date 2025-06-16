import pandas as pd

# Step 1: Load full dataset
df = pd.read_csv("pincodes.csv", dtype={"pincode": str})

# Step 2: Load your PIN list
with open("test_pincode.txt") as f:
    pins = [line.strip().zfill(6) for line in f if line.strip()]

# Step 3: Filter dataset
df2 = df[df["pincode"].isin(pins)]

# Step 4: Rename columns and select required fields
df2 = df2.rename(columns={
    "latitude": "lat", "longitude": "lng", "district": "city", "stateName": "state"
})
output = df2[["pincode","lat","lng","city","state"]]

# Step 5: Export to JSON
print(output.to_json(orient="records", indent=2))
