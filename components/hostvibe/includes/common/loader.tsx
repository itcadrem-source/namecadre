export default function HostvibeIncludeCommonLoader({ classes }: { classes?: string }) {
  return (
    <div className={classes ? `spinner ${classes}` : "spinner"}>
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  );
}
