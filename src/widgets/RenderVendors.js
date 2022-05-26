import { Box } from "@mui/material";
import { Image } from "material";

function RenderVendors({ select, handleSelect }) {
  const vendors = [
    { name: "AirtelTigo Money", img: "airteltigo.jpeg" },
    { name: "MTN Mobile Money", img: "mtn.jpeg" },
    { name: "Vodafone Cash", img: "vodafone.png" },
  ];

  return (
    <Box
      sx={{
        px: 1,
        py: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {vendors.map((vendor, idx) => (
        <Image
          key={idx}
          src={vendor.img}
          alt={vendor.name}
          onClick={() => handleSelect(vendor.name)}
          selected={vendor.name === select ? true : false}
        />
      ))}
    </Box>
  );
}

export default RenderVendors;
