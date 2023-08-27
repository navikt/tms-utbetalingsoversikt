import useSWRImmutable from "swr/immutable";
import ContentLoader from "../contentLoader/ContentLoader";
import { authenticationUrl, baseUrl, loginUrl } from "../../utils/urls.ts";
import { fetcher } from "../../api/api.ts";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const redirectToIdPorten = (redirectUri: string) => {
  window.location.assign(`${loginUrl}?redirect_uri=${redirectUri}`);
};

const Authentication = ({ children }: Props) => {
  const { data, isLoading } = useSWRImmutable(
    { path: authenticationUrl },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );
  const redirectUrl = baseUrl;

  if (isLoading) {
    return <ContentLoader />;
  }

  if (false) { //TO FIX, evig loop med status-sjekk
    redirectToIdPorten(redirectUrl);
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;
