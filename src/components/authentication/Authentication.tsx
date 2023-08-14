import useSWRImmutable from "swr/immutable";
import ContentLoader from "../contentLoader/ContentLoader";
import { authenticationUrl, baseUrl, loginUrl } from "../../utils/urls.ts";
import { fetcher } from "../../api/api.ts";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const redirectToIdPorten = (redirectUri: string) => {
  window.location.assign(`${loginUrl}?redirect_uri=${redirectUri}`);
};

const Authentication = ({ children }: Props) => {
  const { data, isLoading, error } = useSWRImmutable(
    { path: authenticationUrl },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );
  const redirectUrl = baseUrl + window.location.pathname;
  console.log(data)

  if (isLoading) {
    return <ContentLoader />;
  }

  if (!data?.authenticated || error) {
    redirectToIdPorten(redirectUrl);
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;
